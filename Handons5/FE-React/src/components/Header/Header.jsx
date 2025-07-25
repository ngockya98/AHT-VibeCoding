import React from 'react';
import styles from './Header.module.css';

const Header = ({ title, onBack, onNotify }) => (
  <header className={styles.header}>
    {onBack && <button className={styles.back} onClick={onBack}>←</button>}
    <h1>{title}</h1>
    {onNotify && <button className={styles.notify} onClick={onNotify}>🔔</button>}
  </header>
);

export default Header;
