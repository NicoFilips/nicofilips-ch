import { useEffect, useMemo, useState } from 'react';
import questionsData from './data/questions.json';
import strafenData from './data/strafen.json';
import cheatsheetText from './data/cheatsheet.txt?raw';
import './Regeltest.css';
import type {
  ProgressMap,
  Question,
  RoundResult,
  RoundSettings,
  Screen,
} from './types';
import {
  filterPool,
  loadProgress,
  pickRound,
  recordAnswer,
  saveProgress,
  clearProgress,
} from './lib/progress';
import StartScreen from './components/StartScreen';
import Card from './components/Card';
import Summary from './components/Summary';
import CheatSheet from './components/CheatSheet';

const QUESTIONS = [
  ...(questionsData as Question[]),
  ...(strafenData as Question[]),
];

const DEFAULT_SETTINGS: RoundSettings = { topics: [], size: 10, mode: 'all' };

function RegeltestScreens() {
  const [screen, setScreen] = useState<Screen>('start');
  const [progress, setProgress] = useState<ProgressMap>(() => loadProgress());
  const [settings, setSettings] = useState<RoundSettings>(DEFAULT_SETTINGS);
  const [round, setRound] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const [results, setResults] = useState<RoundResult[]>([]);

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const byId = useMemo(() => new Map(QUESTIONS.map((q) => [q.id, q])), []);

  function startRound(custom?: Question[]) {
    const picked =
      custom ??
      pickRound(
        filterPool(QUESTIONS, progress, settings),
        progress,
        settings.size,
      );
    if (!picked.length) return;
    setRound(picked);
    setIndex(0);
    setResults([]);
    setScreen('round');
  }

  function answer(known: boolean) {
    const q = round[index];
    setProgress((p) => recordAnswer(p, q.id, known));
    const nextResults = [...results, { questionId: q.id, known }];
    setResults(nextResults);
    if (index + 1 < round.length) {
      setIndex(index + 1);
    } else {
      setScreen('summary');
    }
  }

  function retryWrong() {
    const wrong = results
      .filter((r) => !r.known)
      .map((r) => byId.get(r.questionId)!);
    startRound(wrong);
  }

  function reset() {
    if (!window.confirm('Gesamten Lernfortschritt löschen?')) return;
    clearProgress();
    setProgress({});
  }

  switch (screen) {
    case 'round':
      return (
        <Card
          question={round[index]}
          position={index + 1}
          total={round.length}
          onAnswer={answer}
          onAbort={() => setScreen('start')}
        />
      );
    case 'summary':
      return (
        <Summary
          results={results}
          byId={byId}
          onRetryWrong={retryWrong}
          onNewRound={() => startRound()}
          onHome={() => setScreen('start')}
        />
      );
    case 'cheatsheet':
      return (
        <CheatSheet text={cheatsheetText} onBack={() => setScreen('start')} />
      );
    default:
      return (
        <StartScreen
          questions={QUESTIONS}
          progress={progress}
          settings={settings}
          onSettings={setSettings}
          onStart={() => startRound()}
          onCheatsheet={() => setScreen('cheatsheet')}
          onReset={reset}
        />
      );
  }
}

export default function RegeltestPage() {
  useEffect(() => {
    document.title = 'Regeltest – Nico Filips';
    return () => {
      document.title = 'Nico Filips';
    };
  }, []);

  return (
    <div className="regeltest">
      <RegeltestScreens />
    </div>
  );
}
