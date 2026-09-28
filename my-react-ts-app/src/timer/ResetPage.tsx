import { useEffect, useState } from 'react';
import { clearAllTimers } from './timerStorage';
import './Timer.css';

function ResetPage() {
  const [cleared, setCleared] = useState<number | null>(null);

  useEffect(() => {
    setCleared(clearAllTimers());
  }, []);

  return (
    <main className="timer-page">
      <div className="timer-card">
        <p className="timer-label">Schnitzeljagd</p>
        <h1 className="timer-title">Alle Timer zurückgesetzt</h1>
        <p className="timer-hint">
          {cleared === null
            ? 'Wird zurückgesetzt …'
            : cleared === 0
              ? 'Es war kein Timer aktiv.'
              : `${cleared} ${cleared === 1 ? 'Timer wurde' : 'Timer wurden'} gelöscht.`}
        </p>
      </div>
    </main>
  );
}

export default ResetPage;
