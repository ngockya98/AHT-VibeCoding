import React from 'react';
import styles from './TransactionItem.module.css';

const TransactionItem = ({ icon, title, amount, date }) => (
  <div className={styles.item}>
    <span className={styles.icon}>{icon}</span>
    <div className={styles.info}>
      <div className={styles.title}>{title}</div>
      <div className={styles.date}>{date}</div>
    </div>
    <div className={styles.amount}>{amount}</div>
  </div>
);

export default TransactionItem;
