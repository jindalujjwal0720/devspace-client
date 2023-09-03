import React from "react";
import styles from "./Logo.module.css";
import { Link } from "react-router-dom";

const Logo = ({ height, link }) => {
  return (
    <Link
      to={link ? link : "/"}
      className={styles.logo_container}
      style={{
        fontSize: height ? height : 20,
      }}
    >
      <div className={styles.logo}>
        <span>Dev</span>space
      </div>
    </Link>
  );
};

export default Logo;
