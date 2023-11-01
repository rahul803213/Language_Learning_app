import React from 'react';
import styles from './CustomSpinner.module.css'; // Import your CSS module

const Spinner = () => {
  return  <div className={styles.spinnerContainer}>
  <div className={styles.spinner}></div>
</div>
};

export default Spinner;