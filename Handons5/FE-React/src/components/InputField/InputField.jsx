import React from 'react';
import styles from './InputField.module.css';

const InputField = ({ label, ...props }) => (
  <div className={styles.field}>
    {label && <label>{label}</label>}
    <input {...props} />
  </div>
);

export default InputField;
