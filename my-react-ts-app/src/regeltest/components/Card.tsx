import { useEffect, useState } from 'react';
import type { Question } from '../types';

interface Props {
  question: Question;
  position: number;
  total: number;
  onAnswer: (known: boolean) => void;
  onAbort: () => void;
}

export default function Card({
  question,
  position,
  total,
  onAnswer,
  onAbort,
}: Props) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    setRevealed(false);
  }, [question.id]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (
        e.target instanceof HTMLElement &&
        ['INPUT', 'TEXTAREA'].includes(e.target.tagName)
      )
        return;
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        if (!revealed) setRevealed(true);
        return;
      }
      if (!revealed) return;
      if (e.key === '1' || e.key === 'ArrowLeft') {
        e.preventDefault();
        onAnswer(false);
      } else if (e.key === '2' || e.key === 'ArrowRight') {
        e.preventDefault();
        onAnswer(true);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [revealed, onAnswer]);

  const pct = Math.round(((position - 1) / total) * 100);

  return (
    <main className="screen card-screen">
      <header className="card-head">
        <button type="button" className="link" onClick={onAbort}>
          ← Abbrechen
        </button>
        <span className="muted">
          {position} / {total}
        </span>
        <span className="badge">{question.topic}</span>
      </header>
      <div
        className="progress"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className="progress-bar" style={{ width: `${pct}%` }} />
      </div>

      <article className={`card ${revealed ? 'revealed' : ''}`}>
        <p className="question">{question.question}</p>
        {revealed && (
          <div className="answer">
            <span className="answer-label">Antwort</span>
            <p>{question.answer}</p>
            {question.uncertain && (
              <p className="uncertain">
                In der Note mit «?» markiert, Antwort unsicher.
              </p>
            )}
          </div>
        )}
      </article>

      <div className="card-actions">
        {!revealed ? (
          <button
            type="button"
            className="primary big"
            onClick={() => setRevealed(true)}
          >
            Antwort aufdecken
            <span className="hint">Leertaste</span>
          </button>
        ) : (
          <>
            <button
              type="button"
              className="bad big"
              onClick={() => onAnswer(false)}
            >
              Nicht gewusst
              <span className="hint">1 oder ←</span>
            </button>
            <button
              type="button"
              className="good big"
              onClick={() => onAnswer(true)}
            >
              Gewusst
              <span className="hint">2 oder →</span>
            </button>
          </>
        )}
      </div>
    </main>
  );
}
