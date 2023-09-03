import React from "react";
import styles from "./ErrorToast.module.css";
import { MdErrorOutline } from "react-icons/md";

const ErrorToast = ({ message }) => {
  return (
    <div className={styles.toast}>
      <MdErrorOutline className={styles.icon} />
      <div className={styles.message}>{message || "Error"}</div>
    </div>
  );
};

export default ErrorToast;
