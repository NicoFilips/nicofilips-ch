import AzureLogo from './../../assets/Icons/Microsoft_Azure.png';

import React from 'react';

const AzureInfo: React.FC = () => {
  return (
    <div style={{ alignItems: 'center', gap: '10px' }}>
      <img src={AzureLogo} alt="Azure" style={{ width: '14px' }} />
      <p className="read-the-docs" style={{ userSelect: 'none', margin: 0 }}>
        This Site is hosted as an App Service on Azure.
      </p>
    </div>
  );
};

export default AzureInfo;
