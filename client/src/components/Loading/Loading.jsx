import React from 'react';
import styles from "./Loading.module.css";
import image from "../../images/loading_spinner.gif";

function Loading() {
  return (
    <div className={styles.container}>
        <img className={styles.spinner} src={image} alt="spinner" />
    </div>
  )
}

export default Loading