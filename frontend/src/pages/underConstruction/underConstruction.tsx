import React from 'react';
import styles from './underConstruction.module.css';
const UnderConstruction: React.FC = () => {
  return (
    <div className={styles.centered}>
      <h1>This page is under construction</h1>
      <div className={styles.icons}>
        <i className={styles.icon1}>&#128679;</i>
        <i className={styles.icon2}>&#128721;</i>
      </div>
    </div>
  );
};

export default UnderConstruction;
