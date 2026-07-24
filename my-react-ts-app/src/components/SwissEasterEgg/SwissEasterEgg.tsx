import { useEffect, useRef, useState } from 'react';
import './SwissEasterEgg.css';

const SWISS_EMOJIS = ['🇨🇭', '🧀', '🍫', '🫕', '🐄', '🏔️', '⌚', '🚡', '⛷️'];

interface ConfettiPiece {
  id: number;
  emoji: string;
  left: number;
  delay: number;
  duration: number;
  size: number;
  drift: number;
}

interface SwissEasterEggProps {
  trigger: number;
}

const SwissEasterEgg: React.FC<SwissEasterEggProps> = ({ trigger }) => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);
  const nextId = useRef(0);

  useEffect(() => {
    if (trigger === 0) return;

    const batch: ConfettiPiece[] = Array.from({ length: 24 }, () => ({
      id: nextId.current++,
      emoji: SWISS_EMOJIS[Math.floor(Math.random() * SWISS_EMOJIS.length)],
      left: Math.random() * 100,
      delay: Math.random() * 0.6,
      duration: 2.2 + Math.random() * 1.8,
      size: 1.2 + Math.random() * 1.4,
      drift: -40 + Math.random() * 80,
    }));

    setPieces((prev) => [...prev, ...batch]);

    const batchIds = new Set(batch.map((p) => p.id));
    const cleanup = setTimeout(() => {
      setPieces((prev) => prev.filter((p) => !batchIds.has(p.id)));
    }, 5000);

    return () => clearTimeout(cleanup);
  }, [trigger]);

  return (
    <div className="swiss-confetti" aria-hidden="true">
        {pieces.map((p) => (
          <span
            key={p.id}
            className="swiss-confetti-piece"
            style={{
              left: `${p.left}vw`,
              fontSize: `${p.size}rem`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              ['--drift' as string]: `${p.drift}px`,
            }}
          >
            {p.emoji}
          </span>
        ))}
    </div>
  );
};

export default SwissEasterEgg;
