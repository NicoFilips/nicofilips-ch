import { useState } from 'react';
import './CircleImage.css';
import image from './IMG_5340-2.jpg';
import ExperienceCounter from '../ExperienceCounter/ExperienceCounter';
const skills = [
  'C#', '.NET', 'TypeScript', 'React', 'Python', 'Docker',
  'Kubernetes', 'Azure', 'SQL', 'Node.js', 'Blazor', 'xUnit',
  'Moq', 'Selenium', 'WPF', 'SignalR',
];

const RADIUS = 155;
const ARC_START = -Math.PI / 4; // upper right
const ARC_END = Math.PI + Math.PI / 4; // upper left (270° arc, gap at top)

const CircleImage: React.FC = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="circle-image-container"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={image}
        alt="Thats me"
        className="circle-image"
        width={300}
        height={200}
      />
      {skills.map((skill, i) => {
        const angle = ARC_START + (i / (skills.length - 1)) * (ARC_END - ARC_START);
        const x = Math.cos(angle) * RADIUS;
        const y = Math.sin(angle) * RADIUS;

        return (
          <span
            key={skill}
            className={`orbit-skill ${hovered ? 'orbit-skill-visible' : ''}`}
            style={{
              transform: hovered
                ? `translate(${x}px, ${y}px) scale(1)`
                : 'translate(0, 0) scale(0)',
              transitionDelay: `${i * 0.03}s`,
            }}
          >
            {skill}
          </span>
        );
      })}
      <div className={`exp-tooltip ${hovered ? 'exp-tooltip-visible' : ''}`}>
        <ExperienceCounter />
      </div>
    </div>
  );
};

export default CircleImage;
