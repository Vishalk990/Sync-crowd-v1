// components/Loader.js

import React from 'react';
import styles from './Loader.module.css'; // Import the CSS module

const Loader = () => {
  return (
    <div className={styles.loading}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default Loader;
