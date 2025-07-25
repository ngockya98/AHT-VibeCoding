import React from 'react';

const TabNavigation = ({ currentTab, setCurrentTab }) => {
  return (
    <nav className="tab-nav">
      <button onClick={() => setCurrentTab('dashboard')}>Dashboard</button>
      <button onClick={() => setCurrentTab('payment')}>Thanh toán NFC/QR</button>
      <button onClick={() => setCurrentTab('savings')}>Gửi tiết kiệm</button>
      <button onClick={() => setCurrentTab('kyc')}>KYC</button>
      <button onClick={() => setCurrentTab('visa')}>Visa ảo</button>
    </nav>
  );
};

export default TabNavigation;
