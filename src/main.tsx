import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { FitnessProvider } from './context/FitnessContext.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FitnessProvider>
      <App />
    </FitnessProvider>
  </StrictMode>,
);
