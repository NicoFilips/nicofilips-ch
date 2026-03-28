import './SpaceObjects.css';

const SpaceObjects: React.FC = () => {
  return (
    <div className="space-container">
      {/* Saturn */}
      <div className="space-object saturn-orbit">
        <svg className="saturn" viewBox="0 0 40 28" width="18" height="13">
          <ellipse cx="20" cy="14" rx="7" ry="6.5" fill="rgba(210,190,150,0.4)" />
          <ellipse
            cx="20"
            cy="14"
            rx="14"
            ry="3.5"
            fill="none"
            stroke="rgba(210,190,150,0.3)"
            strokeWidth="1.2"
          />
        </svg>
      </div>

      {/* Spaceship */}
      <div className="space-object ship-orbit">
        <svg className="spaceship" viewBox="0 0 24 12" width="12" height="6">
          <polygon points="24,6 4,0 6,6 4,12" fill="rgba(180,200,220,0.35)" />
          <line
            x1="0"
            y1="6"
            x2="5"
            y2="6"
            stroke="rgba(100,150,255,0.3)"
            strokeWidth="1.5"
          />
        </svg>
      </div>

      {/* Distant comet */}
      <div className="space-object comet-orbit">
        <svg className="comet" viewBox="0 0 20 4" width="10" height="2">
          <circle cx="17" cy="2" r="1.5" fill="rgba(200,220,255,0.3)" />
          <line
            x1="0"
            y1="2"
            x2="16"
            y2="2"
            stroke="rgba(200,220,255,0.15)"
            strokeWidth="1"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default SpaceObjects;
