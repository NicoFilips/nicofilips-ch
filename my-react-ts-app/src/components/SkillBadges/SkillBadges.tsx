import './SkillBadges.css';

const skills = [
  'C#', '.NET', 'TypeScript', 'React', 'Python', 'Docker',
  'Kubernetes', 'Azure', 'SQL', 'Node.js', 'Blazor', 'xUnit',
];

const SkillBadges: React.FC = () => {
  const doubled = [...skills, ...skills];

  return (
    <div className="marquee-container">
      <div className="marquee-fade marquee-fade-left" />
      <div className="marquee-track">
        {doubled.map((skill, i) => (
          <span key={i} className="marquee-item">
            {skill}
          </span>
        ))}
      </div>
      <div className="marquee-fade marquee-fade-right" />
    </div>
  );
};

export default SkillBadges;
