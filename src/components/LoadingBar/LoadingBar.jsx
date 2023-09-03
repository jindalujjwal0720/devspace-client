import React from "react";
import styles from "./LoadingBar.module.css";

const LoadingBar = () => {
  return (
    <div className={styles.loading}>
      <div className={styles.bar}></div>
      <div className={styles.bar}></div>
    </div>
  );
};

export default LoadingBar;
