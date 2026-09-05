# Fit in Blink ⚡

Smart personalized fitness and nutrition macro targets with dynamic daily workouts and progressive recovery pacing.

---

## 🚀 Easy Netlify Deployment Guide

This app is fully optimized for **zero-config deployment on Netlify**.

### Option 1: Deploy via GitHub (Recommended)

1. Push this repository to **GitHub** (or GitLab/Bitbucket).
2. Log in to [Netlify](https://app.netlify.com/).
3. Click **"Add new site"** → **"Import an existing project"**.
4. Choose your repository. Netlify will automatically detect the settings from `netlify.toml`:
   - **Base directory:** *(leave empty)*
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Click **"Deploy site"**. Your app will be live with full SSL, CDN distribution, and PWA offline capabilities!

---

### Option 2: Netlify Drop (No Git Required)

1. Run the build locally:
   ```bash
   npm run build
   ```
2. Log in to [Netlify Drop](https://app.netlify.com/drop).
3. Drag and drop the generated `dist/` folder into the upload box.
4. Your website is instantly deployed! The included `_redirects` and `_headers` files in `dist/` ensure smooth single-page routing and PWA caching.

---

### Option 3: Netlify CLI

1. Install the Netlify CLI (if not already installed):
   ```bash
   npm install -g netlify-cli
   ```
2. Build and deploy:
   ```bash
   npm run build
   netlify deploy --prod --dir=dist
   ```

---

## ✨ Netlify Features Configured

- **`netlify.toml`**: Configures build command, `dist` publish folder, and Node 20 environment.
- **SPA Routing (`_redirects`)**: Prevents 404 errors on page refreshes or deep URLs.
- **PWA Service Worker Optimization (`_headers`)**: Ensures the Service Worker (`/sw.js`) revalidates immediately so users receive seamless updates.
- **CDN Asset Caching**: 1-year immutable caching for Vite's hashed scripts and CSS files in `/assets/`.
