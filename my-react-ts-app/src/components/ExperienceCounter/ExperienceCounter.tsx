import { useState, useEffect } from 'react';
import './ExperienceCounter.css';

const START_DATE = new Date(2016, 8, 1); // September 1, 2016

function calcDuration() {
  const now = new Date();

  let years = now.getFullYear() - START_DATE.getFullYear();
  let months = now.getMonth() - START_DATE.getMonth();
  let days = now.getDate() - START_DATE.getDate();

  if (days < 0) {
    months--;
    const prev = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prev.getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  return { years, months, days, hours, minutes, seconds };
}

const pad = (n: number) => String(n).padStart(2, '0');

const ExperienceCounter: React.FC = () => {
  const [duration, setDuration] = useState(calcDuration);

  useEffect(() => {
    const id = setInterval(() => setDuration(calcDuration()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="exp-counter">
      <span className="exp-label">Developing magic stuff since</span>
      <span className="exp-ticker">
        <span className="exp-num">{duration.years}</span> years
        {' · '}
        <span className="exp-num">{duration.months}</span> months
        {' · '}
        <span className="exp-num">{duration.days}</span> days
        {' · '}
        <span className="exp-num">{pad(duration.hours)}</span>h{' '}
        <span className="exp-num">{pad(duration.minutes)}</span>m{' '}
        <span className="exp-num">{pad(duration.seconds)}</span>s
      </span>
    </div>
  );
};

export default ExperienceCounter;
