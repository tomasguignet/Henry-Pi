import React from 'react';
import styles from "./Loading.module.css";
import image from "../../images/loading_spinner_2.gif";

function Loading() {
  return (
    <div className={styles.container}>
        <img className={styles.spinner} src={image} alt="spinner" />
    </div>
  )
}

export default Loading