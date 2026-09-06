import express from "express";
import http from "http";
import path from "path";
import { WebSocketServer, WebSocket } from "ws";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI, Modality, LiveServerMessage } from "@google/genai";

dotenv.config();

const PORT = 3000;
const HOST = "0.0.0.0";

function getGenAI(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured in environment variables.");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

async function startServer() {
  const app = express();
  const server = http.createServer(app);

  app.use(express.json());

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      hasApiKey: !!process.env.GEMINI_API_KEY,
    });
  });

  // Fitness Guide with Search Grounding using gemini-3.5-flash
  app.post("/api/fitness-guide/ask", async (req, res) => {
    try {
      const { query, userContext } = req.body;
      if (!query || typeof query !== "string") {
        return res.status(400).json({ error: "Search query is required." });
      }

      const ai = getGenAI();

      let contextPrompt = "";
      if (userContext) {
        contextPrompt = `\nUser Profile & Goals Context:
- Weight: ${userContext.weight || "N/A"} kg
- Height: ${userContext.height || "N/A"} cm
- Goal: ${userContext.goal || "Fitness & Health"}
- Daily Target: ${userContext.calories ? `${userContext.calories} kcal` : "N/A"}
- Fitness Level: ${userContext.activityLevel || "Active"}\n`;
      }

      const prompt = `Provide an evidence-based, scientifically accurate, and directly actionable fitness and nutrition guide response for the user's question. Use real-time information from Google Search where applicable.

User Question: "${query}"${contextPrompt}

Structure your response with:
1. Direct Executive Summary / Recommendation
2. Evidence & Science Breakdown (mechanisms, optimal dosages, repetition ranges, timing, or technique cues)
3. Step-by-Step Action Plan
4. Common Mistakes to Avoid & Pro Tips`;

      let response;
      let usedSearch = true;
      try {
        response = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: prompt,
          config: {
            systemInstruction:
              "You are the head master sports scientist, biomechanist, and clinical nutritionist for 'Fit in Blink'. Deliver clear, evidence-based, authoritative, and motivating guidance. Format using clean Markdown with bolding, lists, and headers. Never recommend dangerous or unverified fads.",
            tools: [{ googleSearch: {} }],
          },
        });
      } catch (searchError: any) {
        console.warn("Search Grounding rate limited or failed, falling back to direct AI generation:", searchError?.message);
        usedSearch = false;
        response = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: prompt,
          config: {
            systemInstruction:
              "You are the head master sports scientist, biomechanist, and clinical nutritionist for 'Fit in Blink'. Deliver clear, evidence-based, authoritative, and motivating guidance. Format using clean Markdown with bolding, lists, and headers. Never recommend dangerous or unverified fads.",
          },
        });
      }

      const answer = response.text || "No response generated.";

      // Extract Google Search Grounding metadata
      const candidate = response.candidates?.[0];
      const rawChunks = candidate?.groundingMetadata?.groundingChunks || [];
      const sources: { title: string; uri: string }[] = [];

      for (const chunk of rawChunks) {
        if (chunk.web?.uri) {
          sources.push({
            title: chunk.web.title || chunk.web.uri,
            uri: chunk.web.uri,
          });
        }
      }

      // Deduplicate sources by URI
      const uniqueSources = sources.filter(
        (src, idx, arr) => arr.findIndex((s) => s.uri === src.uri) === idx
      );

      const searchQueries: string[] =
        candidate?.groundingMetadata?.webSearchQueries || [];

      return res.json({
        answer,
        sources: uniqueSources,
        searchQueries,
      });
    } catch (error: any) {
      console.error("Error in /api/fitness-guide/ask:", error);
      const isQuota = error?.status === 429 || error?.message?.includes("RESOURCE_EXHAUSTED");
      const isMissingKey = error?.message?.includes("GEMINI_API_KEY");

      return res.status(500).json({
        error: isMissingKey
          ? "Gemini API Key is missing. Please configure GEMINI_API_KEY in Settings > Secrets."
          : isQuota
          ? "Google Search Grounding rate limit reached. Please wait a moment before trying again."
          : error?.message || "Failed to generate fitness guide advice.",
      });
    }
  });

  // WebSocket Server for Gemini Live API Voice Conversations (gemini-3.1-flash-live-preview)
  const wss = new WebSocketServer({ server, path: "/api/live-ws" });

  wss.on("connection", async (clientWs: WebSocket, req: any) => {
    let session: any = null;

    try {
      const url = new URL(req.url || "", `http://${req.headers?.host || "localhost"}`);
      const lang = (url.searchParams.get("lang") || "hinglish").toLowerCase();
      console.log(`[Live API] Client connected with language preference: ${lang}`);

      let systemInstruction = "";
      if (lang === "hinglish") {
        systemInstruction =
          "You are Coach Zephyr (Coach Veer), an energetic, high-octane personal fitness trainer for 'Fit in Blink'. Speak in authentic, motivating, conversational Hinglish (a vibrant, natural blend of Hindi and English like 'Arre champion, kya haal hai!', 'Dumbbell bench press me arch maintain karo aur chest se press karo', 'Shabash, form solid hai!', 'Aaj ka calorie and protein target hit karna hai boss!'). Keep spoken responses short, punchy (1 to 3 sentences maximum), and electrifying so the user can easily listen mid-workout. If asked about workouts, exercises, or form, give crisp cues. If asked about nutrition, give direct numbers.";
      } else if (lang === "hindi") {
        systemInstruction =
          "You are Coach Zephyr, an energetic personal fitness trainer for 'Fit in Blink'. Speak in clear, warm, conversational Hindi. Keep spoken responses short, punchy (1 to 3 sentences), highly motivating, and focused on fitness, exercise cues, and nutrition targets.";
      } else {
        systemInstruction =
          "You are Coach Zephyr, the high-energy personal fitness trainer for 'Fit in Blink'. You speak directly to the user in a natural, athletic, and motivating tone. Keep spoken responses short, punchy (1 to 3 sentences usually), and clear so the user can easily listen during workout sets, stretches, or meal prep. If asked about workouts, exercises, or form, give crisp cues. If asked about nutrition or macros, give direct targets.";
      }

      const ai = getGenAI();

      session = await ai.live.connect({
        model: "gemini-3.1-flash-live-preview",
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: "Zephyr" },
            },
          },
          systemInstruction,
          outputAudioTranscription: {},
          inputAudioTranscription: {},
        },
        callbacks: {
          onmessage: (message: LiveServerMessage) => {
            if (clientWs.readyState !== WebSocket.OPEN) return;

            // Audio parts from model response
            const parts = message.serverContent?.modelTurn?.parts;
            if (parts && parts.length > 0) {
              for (const part of parts) {
                if (part.inlineData?.data) {
                  clientWs.send(
                    JSON.stringify({
                      type: "audio",
                      audio: part.inlineData.data,
                    })
                  );
                }
                if (part.text) {
                  clientWs.send(
                    JSON.stringify({
                      type: "text",
                      text: part.text,
                    })
                  );
                }
              }
            }

            // User audio transcription if enabled
            const inTranscription = (message.serverContent as any)?.inputAudioTranscription?.text;
            if (inTranscription) {
              clientWs.send(
                JSON.stringify({
                  type: "user_transcription",
                  text: inTranscription,
                })
              );
            }

            // Model audio transcription if enabled
            const outTranscription = (message.serverContent as any)?.outputAudioTranscription?.text;
            if (outTranscription) {
              clientWs.send(
                JSON.stringify({
                  type: "model_transcription",
                  text: outTranscription,
                })
              );
            }

            // Interruption signal
            if (message.serverContent?.interrupted) {
              clientWs.send(JSON.stringify({ type: "interrupted", interrupted: true }));
            }

            // Turn complete signal
            if (message.serverContent?.turnComplete) {
              clientWs.send(JSON.stringify({ type: "turn_complete" }));
            }
          },
        },
      });

      clientWs.send(JSON.stringify({ type: "ready", message: "Connected to Coach Zephyr" }));
    } catch (err: any) {
      console.error("[Live API] Failed to connect to Gemini Live:", err);
      clientWs.send(
        JSON.stringify({
          type: "error",
          message: err?.message || "Failed to initialize Live API voice session.",
        })
      );
      clientWs.close();
      return;
    }

    clientWs.on("message", (raw: Buffer) => {
      try {
        const data = JSON.parse(raw.toString());
        if (data.type === "audio" && data.audio && session) {
          // PCM 16kHz audio chunk
          session.sendRealtimeInput({
            audio: {
              data: data.audio,
              mimeType: "audio/pcm;rate=16000",
            },
          });
        } else if (data.type === "text" && data.text && session) {
          session.sendRealtimeInput({
            text: data.text,
          });
        }
      } catch (err) {
        console.error("[Live API] Error handling client message:", err);
      }
    });

    clientWs.on("close", () => {
      console.log("[Live API] Client disconnected from live socket");
      if (session) {
        try {
          session.close();
        } catch (_) {}
        session = null;
      }
    });

    clientWs.on("error", (err) => {
      console.error("[Live API] WebSocket error:", err);
    });
  });

  // Vite middleware for dev or static serving for prod
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  server.listen(PORT, HOST, () => {
    console.log(`Server listening at http://${HOST}:${PORT}`);
  });
}

startServer();
