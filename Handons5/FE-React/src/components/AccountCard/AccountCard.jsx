import React from 'react';
import styles from './AccountCard.module.css';

const AccountCard = ({ accountName, balance, currency }) => (
  <div className={styles.card}>
    <div className={styles.name}>{accountName}</div>
    <div className={styles.balance}>{balance} {currency}</div>
  </div>
);

export default AccountCard;
