import { useEffect, useState } from 'react';
import { TimerDefinition } from './timerConfig';
import { readStartedAt, startTimer } from './timerStorage';
import './Timer.css';

interface TimerPageProps {
  timer: TimerDefinition;
  /** Pre-started timers (test page) pass the stored start time in */
  initialStartedAt?: number | null;
}

function formatRemaining(ms: number): string {
  const totalSeconds = Math.max(0, Math.ceil(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function formatMinutes(minutes: number): string {
  const rounded = Math.round(minutes * 100) / 100;
  return `${rounded} ${rounded === 1 ? 'Minute' : 'Minuten'}`;
}

export function UnknownTimerPage() {
  return (
    <main className="timer-page">
      <div className="timer-card">
        <p className="timer-label">Schnitzeljagd</p>
        <h1 className="timer-title">Unbekannter Timer</h1>
        <p className="timer-hint">Dieser QR-Code gehört zu keiner Station.</p>
      </div>
    </main>
  );
}

function TimerPage({ timer, initialStartedAt }: TimerPageProps) {
  const [startedAt, setStartedAt] = useState<number | null>(
    () => initialStartedAt ?? readStartedAt(timer.hash),
  );
  const [now, setNow] = useState<number>(() => Date.now());

  useEffect(() => {
    if (startedAt === null) return;
    const id = window.setInterval(() => setNow(Date.now()), 250);
    return () => window.clearInterval(id);
  }, [startedAt]);

  const durationMs = timer.minutes * 60_000;
  const remainingMs =
    startedAt === null ? durationMs : startedAt + durationMs - now;
  const isDone = startedAt !== null && remainingMs <= 0;

  useEffect(() => {
    document.title = isDone
      ? `Fertig – ${timer.label}`
      : startedAt === null
        ? timer.label
        : `${formatRemaining(remainingMs)} – ${timer.label}`;
    return () => {
      document.title = 'Nico Filips';
    };
  }, [timer, isDone, startedAt, remainingMs]);

  if (startedAt === null) {
    return (
      <main className="timer-page">
        <div className="timer-card">
          <p className="timer-label">Schnitzeljagd</p>
          <h1 className="timer-title">{timer.label}</h1>
          <p className="timer-hint">
            Dieser Timer läuft {formatMinutes(timer.minutes)}. Sobald er
            abgelaufen ist, erscheint hier der nächste Hinweis.
          </p>
          <button
            className="glow-btn timer-start-btn"
            onClick={() => setStartedAt(startTimer(timer.hash).startedAt)}
          >
            Timer starten
          </button>
        </div>
      </main>
    );
  }

  if (isDone) {
    return (
      <main className="timer-page">
        <div className="timer-card">
          <span className="timer-done-badge" aria-hidden="true">
            🎉
          </span>
          <p className="timer-label">{timer.label}</p>
          <h1 className="timer-title">Zeit abgelaufen!</h1>
          <p className="timer-message">{timer.message}</p>
        </div>
      </main>
    );
  }

  const progress = Math.min(1, Math.max(0, 1 - remainingMs / durationMs));
  const isUrgent = remainingMs <= 30_000;

  return (
    <main className="timer-page">
      <div className="timer-card">
        <p className="timer-label">{timer.label}</p>
        <h1 className="timer-title">Der Timer läuft …</h1>
        <div
          className={`timer-countdown${isUrgent ? ' is-urgent' : ''}`}
          aria-live="polite"
        >
          {formatRemaining(remainingMs)}
        </div>
        <div
          className="timer-progress"
          role="progressbar"
          aria-valuenow={Math.round(progress * 100)}
        >
          <span style={{ width: `${progress * 100}%` }} />
        </div>
        <p className="timer-hint">
          Du kannst die Seite schliessen, der Timer läuft im Hintergrund weiter.
        </p>
      </div>
    </main>
  );
}

export default TimerPage;
