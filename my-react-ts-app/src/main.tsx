import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import TheParticles from './components/Background/TheParticles.tsx';
import { matchRoute } from './routes.tsx';

const route = matchRoute(window.location.pathname);
if (route) document.body.classList.add('native-cursor');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TheParticles />
    {route ?? <App />}
  </React.StrictMode>,
);
