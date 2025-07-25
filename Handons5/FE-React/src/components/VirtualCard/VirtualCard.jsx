import React from 'react';
import styles from './VirtualCard.module.css';

const VirtualCard = ({ cardNumber, name, expiry, cvv }) => (
  <div className={styles.card}>
    <div className={styles.chip}></div>
    <div className={styles.number}>{cardNumber}</div>
    <div className={styles.info}>
      <span>{name}</span>
      <span>{expiry}</span>
      <span>CVV: {cvv}</span>
    </div>
  </div>
);

export default VirtualCard;
