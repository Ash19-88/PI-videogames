import React from "react";
import { Link } from "react-router-dom";
import styles from './LandingPage.module.css'

export default function LandingPage(){
    return(
            <div className={styles.imageLanding}>
                <div className={styles.containerTitle}>
                    <h1 className={styles.titleLanding}>Welcome</h1>
                <Link to='/home' >
                    <button className={styles.btnLanding}>ENTER</button>
                </Link>
                </div>
            </div>
    )
}