import React from 'react';
import styles from './QuickActionButton.module.css';

const QuickActionButton = ({ icon, label, onClick }) => (
  <button className={styles.button} onClick={onClick}>
    <span className={styles.icon}>{icon}</span>
    <span>{label}</span>
  </button>
);

export default QuickActionButton;
