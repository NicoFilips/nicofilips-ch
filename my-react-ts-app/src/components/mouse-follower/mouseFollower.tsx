import { useEffect, useState } from 'react';

const LINE_LENGTH = 6;
const GAP = 2.5;
const THICKNESS = 1.2;
const COLOR = '#00ff00';

const MouseFollower = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hasPointer, setHasPointer] = useState(true);

  useEffect(() => {
    setHasPointer(window.matchMedia('(hover: hover) and (pointer: fine)').matches);
  }, []);

  useEffect(() => {
    if (!hasPointer) return;
    const handleMouseMove = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [hasPointer]);

  if (!hasPointer) return null;

  const shared = {
    position: 'absolute' as const,
    background: COLOR,
    borderRadius: '1px',
    boxShadow: `0 0 4px ${COLOR}`,
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: position.y,
        left: position.x,
        pointerEvents: 'none',
        zIndex: 9999,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* Top */}
      <div
        style={{
          ...shared,
          width: THICKNESS,
          height: LINE_LENGTH,
          left: -THICKNESS / 2,
          bottom: GAP,
        }}
      />
      {/* Bottom */}
      <div
        style={{
          ...shared,
          width: THICKNESS,
          height: LINE_LENGTH,
          left: -THICKNESS / 2,
          top: GAP,
        }}
      />
      {/* Left */}
      <div
        style={{
          ...shared,
          width: LINE_LENGTH,
          height: THICKNESS,
          top: -THICKNESS / 2,
          right: GAP,
        }}
      />
      {/* Right */}
      <div
        style={{
          ...shared,
          width: LINE_LENGTH,
          height: THICKNESS,
          top: -THICKNESS / 2,
          left: GAP,
        }}
      />
    </div>
  );
};

export default MouseFollower;
