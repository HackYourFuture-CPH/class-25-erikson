import React, { useEffect, useState } from 'react';

import styles from './underConstruction.module.css';
const UnderConstruction: React.FC = () => {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const redirectTimeout = setInterval(() => {
      if (countdown === 1) {
        // Redirect when countdown reaches 1
        window.location.href = '/courses'; // Replace with the actual URL of your courses page
      } else {
        setCountdown(countdown - 1);
      }
    }, 1000); // 1 second interval

    return () => {
      clearInterval(redirectTimeout); // Clear the interval if the component unmounts
    };
  }, [countdown]);

  return (
    <div className={styles.centered}>
      <h1>This page is under construction</h1>
      <div className={styles.icons}>
        <i className={styles.icon1}>&#128679;</i>
        <i className={styles.icon2}>&#128721;</i>
      </div>
      <p>Redirecting in {countdown} seconds...</p>
    </div>
  );
};

export default UnderConstruction;
