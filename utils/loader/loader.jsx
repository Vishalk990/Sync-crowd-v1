// components/Loader.js

import React from 'react';
import styles from "./loader.module.css"; 

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
