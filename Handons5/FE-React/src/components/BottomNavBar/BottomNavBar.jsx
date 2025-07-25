import React from 'react';
import styles from './BottomNavBar.module.css';

const BottomNavBar = ({ currentTab, setCurrentTab }) => (
  <nav className={styles.navbar}>
    <button onClick={() => setCurrentTab('dashboard')} className={currentTab==='dashboard'?styles.active:''}>🏠</button>
    <button onClick={() => setCurrentTab('payment')} className={currentTab==='payment'?styles.active:''}>💳</button>
    <button onClick={() => setCurrentTab('savings')} className={currentTab==='savings'?styles.active:''}>💰</button>
    <button onClick={() => setCurrentTab('kyc')} className={currentTab==='kyc'?styles.active:''}>🪪</button>
    <button onClick={() => setCurrentTab('visa')} className={currentTab==='visa'?styles.active:''}>💳</button>
  </nav>
);

export default BottomNavBar;
