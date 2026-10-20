import type { Question, RoundResult } from '../types';

interface Props {
  results: RoundResult[];
  byId: Map<string, Question>;
  onRetryWrong: () => void;
  onNewRound: () => void;
  onHome: () => void;
}

export default function Summary({
  results,
  byId,
  onRetryWrong,
  onNewRound,
  onHome,
}: Props) {
  const known = results.filter((r) => r.known).length;
  const wrong = results.filter((r) => !r.known);
  const pct = results.length ? Math.round((known / results.length) * 100) : 0;

  return (
    <main className="screen summary">
      <header className="hero">
        <h1>Runde fertig</h1>
        <p className="score">
          {known} / {results.length} gewusst{' '}
          <span className="muted">({pct} %)</span>
        </p>
      </header>

      <div className="actions">
        {wrong.length > 0 && (
          <button type="button" className="primary big" onClick={onRetryWrong}>
            Falsche nochmal
            <span className="hint">{wrong.length} Fragen</span>
          </button>
        )}
        <button
          type="button"
          className={wrong.length ? 'secondary' : 'primary big'}
          onClick={onNewRound}
        >
          Neue Runde
        </button>
        <button type="button" className="link" onClick={onHome}>
          Zum Start
        </button>
      </div>

      {wrong.length > 0 && (
        <section className="panel">
          <h2>Nicht gewusst</h2>
          <ul className="review">
            {wrong.map((r) => {
              const q = byId.get(r.questionId)!;
              return (
                <li key={q.id}>
                  {q.image ? (
                    <>
                      <img
                        className="situation small"
                        src={q.image.question}
                        width={q.image.width}
                        height={q.image.height}
                        alt={q.question}
                      />
                      <img
                        className="situation small"
                        src={q.image.answer}
                        width={q.image.answerWidth}
                        height={q.image.answerHeight}
                        alt={
                          q.answer
                            ? `Die richtige Antwort ist: ${q.answer}`
                            : 'Richtige Antwort'
                        }
                      />
                    </>
                  ) : (
                    <>
                      <p className="review-q">{q.question}</p>
                      <p className="review-a">{q.answer}</p>
                    </>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </main>
  );
}
