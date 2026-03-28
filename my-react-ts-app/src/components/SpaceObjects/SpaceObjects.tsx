import './SpaceObjects.css';

const rockets = Array.from({ length: 10 }, (_, i) => ({
  id: `rocket-${i}`,
  delay: -(i * 7),
  size: 8 + Math.round((i * 3) % 7),
  opacity: 0.3 + (i % 5) * 0.05,
  startTop: 60 + (i * 13) % 40,
  endTop: 5 + (i * 11) % 35,
  duration: 55 + (i * 7) % 40,
}));

const saturns = Array.from({ length: 10 }, (_, i) => ({
  id: `saturn-${i}`,
  delay: -(i * 9),
  size: 9 + Math.round((i * 4) % 6),
  opacity: 0.3 + (i % 4) * 0.06,
  top: 5 + (i * 9) % 85,
}));

const SpaceObjects: React.FC = () => {
  return (
    <div className="space-container">
      {saturns.map((s) => (
        <div
          key={s.id}
          className="space-object saturn-orbit"
          style={{
            animationDelay: `${s.delay}s`,
            fontSize: `${s.size}px`,
            opacity: s.opacity,
            top: `${s.top}%`,
          }}
        >
          🪐
        </div>
      ))}
      {rockets.map((r) => (
        <div
          key={r.id}
          className="space-object"
          style={{
            animationDelay: `${r.delay}s`,
            fontSize: `${r.size}px`,
            opacity: r.opacity,
            animationName: `rocketPath${r.id.split('-')[1]}`,
            animationDuration: `${r.duration}s`,
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
          }}
        >
          🚀
        </div>
      ))}
      <style>
        {rockets.map((r, i) => `
          @keyframes rocketPath${i} {
            0% { left: -5%; top: ${r.startTop}%; }
            100% { left: 105%; top: ${r.endTop}%; }
          }
        `).join('')}
      </style>
    </div>
  );
};

export default SpaceObjects;
