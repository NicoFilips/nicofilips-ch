import { useMemo } from 'react';
import type { ProgressMap, Question, RoundSettings } from '../types';
import { computeStats, filterPool } from '../lib/progress';

interface Props {
  questions: Question[];
  progress: ProgressMap;
  settings: RoundSettings;
  onSettings: (s: RoundSettings) => void;
  onStart: () => void;
  onCheatsheet: () => void;
  onReset: () => void;
}

const SIZES = [10, 20, 0];

export default function StartScreen({
  questions,
  progress,
  settings,
  onSettings,
  onStart,
  onCheatsheet,
  onReset,
}: Props) {
  const stats = useMemo(
    () => computeStats(questions, progress),
    [questions, progress],
  );
  const topics = useMemo(() => {
    const counts = new Map<string, number>();
    for (const q of questions)
      counts.set(q.topic, (counts.get(q.topic) ?? 0) + 1);
    return [...counts.entries()].sort((a, b) => b[1] - a[1]);
  }, [questions]);
  const poolSize = filterPool(questions, progress, settings).length;

  function toggleTopic(topic: string) {
    const has = settings.topics.includes(topic);
    onSettings({
      ...settings,
      topics: has
        ? settings.topics.filter((t) => t !== topic)
        : [...settings.topics, topic],
    });
  }

  return (
    <main className="screen start">
      <header className="hero">
        <h1>Regeltest</h1>
        <p className="muted">Eishockey-Regelfragen als Karteikarten</p>
      </header>

      <section className="stats" aria-label="Lernstand">
        <Stat label="Fragen" value={stats.total} />
        <Stat label="Neu" value={stats.unseen} tone="neutral" />
        <Stat label="Schwach" value={stats.weak} tone="bad" />
        <Stat label="Am Lernen" value={stats.learning} tone="mid" />
        <Stat label="Sicher" value={stats.strong} tone="good" />
      </section>

      <section className="panel">
        <h2>Themen</h2>
        <div className="chips">
          <button
            type="button"
            className={`chip ${settings.topics.length === 0 ? 'active' : ''}`}
            onClick={() => onSettings({ ...settings, topics: [] })}
          >
            Alle
          </button>
          {topics.map(([topic, n]) => (
            <button
              key={topic}
              type="button"
              className={`chip ${settings.topics.includes(topic) ? 'active' : ''}`}
              onClick={() => toggleTopic(topic)}
            >
              {topic} <span className="chip-count">{n}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="panel row">
        <div>
          <h2>Auswahl</h2>
          <div className="segmented">
            <button
              type="button"
              className={settings.mode === 'all' ? 'active' : ''}
              onClick={() => onSettings({ ...settings, mode: 'all' })}
            >
              Alle
            </button>
            <button
              type="button"
              className={settings.mode === 'weak' ? 'active' : ''}
              onClick={() => onSettings({ ...settings, mode: 'weak' })}
            >
              Nur schwache
            </button>
          </div>
        </div>
        <div>
          <h2>Fragen pro Runde</h2>
          <div className="segmented">
            {SIZES.map((size) => (
              <button
                key={size}
                type="button"
                className={settings.size === size ? 'active' : ''}
                onClick={() => onSettings({ ...settings, size })}
              >
                {size === 0 ? 'Alle' : size}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="actions">
        <button
          type="button"
          className="primary big"
          onClick={onStart}
          disabled={poolSize === 0}
        >
          Runde starten
          <span className="hint">
            {poolSize === 0
              ? 'keine Fragen in dieser Auswahl'
              : `${settings.size === 0 ? poolSize : Math.min(settings.size, poolSize)} von ${poolSize} Fragen`}
          </span>
        </button>
        <button type="button" className="secondary" onClick={onCheatsheet}>
          Spickzettel
        </button>
        <button type="button" className="link danger" onClick={onReset}>
          Fortschritt zurücksetzen
        </button>
      </div>
    </main>
  );
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone?: 'neutral' | 'bad' | 'mid' | 'good';
}) {
  return (
    <div className={`stat ${tone ?? ''}`}>
      <span className="stat-value">{value}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}
