import React from 'react'
import { Link } from 'react-router-dom'
import styles from "./PageNotFound.module.css";

function PageNotFound() {
  return (
    <div className={styles.container}>
        <h1>404</h1>
        <h2>There is no recipe here!</h2>

        <Link to={"/home"} className={styles.button}>
            <button>Home</button>
        </Link>
    </div>
  )
}

export default PageNotFound