import React, { useState } from 'react';
import './App.css';
import TabNavigation from './components/TabNavigation';
import Dashboard from './pages/Dashboard';
import Payment from './pages/Payment';
import Savings from './pages/Savings';
import KYC from './pages/KYC';
import Visa from './pages/Visa';

function App() {
  const [currentTab, setCurrentTab] = useState('dashboard');

  const renderPage = () => {
    switch (currentTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'payment':
        return <Payment />;
      case 'savings':
        return <Savings />;
      case 'kyc':
        return <KYC />;
      case 'visa':
        return <Visa />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app-container">
      <TabNavigation currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <main>
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
