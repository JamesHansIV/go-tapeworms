import React from "react";
import { BrowserRouter } from "react-router-dom";

import NavBar from "./nav-bar.js";
import Line from "./line.js";
import Lines from "./lines.js";
import styles from "./header.module.css";

import {lineColors} from "../lineColors.js";

function Header() {
    return (
        <div className={styles.containerGrid}>
            <div className={styles.logoContainer}>
                <Lines colors={lineColors} angle={57}/>
                <img src={"logo.png"} className={styles.logo}/>
            </div>
            <div className={styles.titleContainer}>
                <div className={styles.title}>
                    <h1 className={styles.titleUpper}>Tapeworms</h1>
                    <h1 className={styles.titleLower}>Unlocked</h1>
                </div>
            </div>
    
            <div className={styles.headerContent}>
                <div className={styles.siteDescriptionContainer}>
                    <span className={styles.siteDescription}>
                        An interactive identification key to elasmobranch tapeworms
                    </span>
                </div>
                <div className={styles.navbar}>
                    <BrowserRouter>
                        <NavBar/>
                    </BrowserRouter>
                </div>
            </div>
        </div>
    );
}

export default Header;  