import GithubLogo from './../../assets/Icons/GithubInverted.png'

import React from 'react';

// <img src={GithubLogo} alt="GitHub" style={{ width: '20px' }} />

const SourceCode: React.FC = () => {
  return (
    <div style={{ alignItems: 'center', gap: '10px' }}>
      <img src={GithubLogo} alt="GitHub" style={{ width: '13px' }} />
      <a
        href="https://github.com/NicoFilips/appservice-nicofilips"
        target="_blank"
        rel="noopener noreferrer"
        style={{ fontSize: 'small' }}
      >
        &nbsp; Source Code
      </a>
    </div>

  );
};

export default SourceCode;