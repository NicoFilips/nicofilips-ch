import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import TheParticles from './components/Background/TheParticles.tsx';
import { matchTimerRoute } from './timer/TimerRouter.tsx';

const timerRoute = matchTimerRoute(window.location.pathname);
if (timerRoute) document.body.classList.add('native-cursor');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TheParticles />
    {timerRoute ?? <App />}
  </React.StrictMode>,
);
