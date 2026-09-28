import { FormEvent, useState } from 'react';
import { TEST_PATH_SEGMENT, TimerDefinition } from './timerConfig';
import { readStoredTimer, startTimer, StoredTimer } from './timerStorage';
import TimerPage from './TimerPage';
import './Timer.css';

const MIN_MINUTES = 0.1;
const MAX_MINUTES = 180;

function readMinutesFromQuery(): number {
  const raw = new URLSearchParams(window.location.search).get('minutes');
  const parsed = raw === null ? NaN : Number(raw);
  return Number.isFinite(parsed) && parsed >= MIN_MINUTES ? parsed : 1;
}

function buildTestTimer(durationMs: number): TimerDefinition {
  return {
    hash: TEST_PATH_SEGMENT,
    label: 'Test-Timer',
    minutes: durationMs / 60_000,
    message: 'Test erfolgreich. Hier würde der nächste Hinweis stehen.',
  };
}

function TestTimerPage() {
  const [stored, setStored] = useState<StoredTimer | null>(() =>
    readStoredTimer(TEST_PATH_SEGMENT),
  );
  const [minutes, setMinutes] = useState<string>(() =>
    String(readMinutesFromQuery()),
  );

  if (stored && stored.durationMs !== undefined) {
    return (
      <TimerPage
        timer={buildTestTimer(stored.durationMs)}
        initialStartedAt={stored.startedAt}
      />
    );
  }

  const parsed = Number(minutes);
  const isValid =
    Number.isFinite(parsed) && parsed >= MIN_MINUTES && parsed <= MAX_MINUTES;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!isValid) return;
    setStored(startTimer(TEST_PATH_SEGMENT, Math.round(parsed * 60_000)));
  };

  return (
    <main className="timer-page">
      <form className="timer-card" onSubmit={handleSubmit}>
        <p className="timer-label">Schnitzeljagd</p>
        <h1 className="timer-title">Test-Timer</h1>
        <p className="timer-hint">
          Dauer frei wählen. Der Timer wird wie ein echter gespeichert und mit
          /timer/reset wieder gelöscht.
        </p>
        <label className="timer-field">
          <span>Minuten</span>
          <input
            type="number"
            inputMode="decimal"
            min={MIN_MINUTES}
            max={MAX_MINUTES}
            step="any"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            autoFocus
          />
        </label>
        <button
          type="submit"
          className="glow-btn timer-start-btn"
          disabled={!isValid}
        >
          Timer starten
        </button>
      </form>
    </main>
  );
}

export default TestTimerPage;
