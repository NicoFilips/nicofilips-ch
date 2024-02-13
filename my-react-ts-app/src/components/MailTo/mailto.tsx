import React from 'react';
import mailLogo from './../../assets/Icons/mail.png'; // Pfad zu deinem Logo

interface mailtoProps {
  email: string; // Für einen Mailto-Link
  // url: string; // Für einen normalen Link
}

const Mailto: React.FC<mailtoProps> = ({ email }) => {
  return (
    <a href={`mailto:${email}`} target="_blank" rel="noopener noreferrer">
      <img src={mailLogo} className="logo" alt="Mein Logo" style={{ userSelect: 'none', width: '100px', height:'50'  }} />
    </a>
  );
};

export default Mailto;