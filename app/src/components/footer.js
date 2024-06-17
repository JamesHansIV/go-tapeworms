import React from "react";

import styles from "./footer.module.css";

function Footer () {
    return (
        <div className={styles.container}>
            <div className={styles.grantContainer}>
                <img className={styles.nsfLogo} src={"nsf_logo.png"}/>
                <p className={styles.text}>NSF DEB Award<br/>Nos. 1921404 & 1921411</p>
            </div>
            <div className={styles.infoContainer}>
                <img className={styles.siteLogo} src={"logo.png"}/>
                <p className={styles.copyright}>Copyright © 2024 Tapeworms Unlocked</p>
                <p className={styles.text}>Created by J. Hanselman & K. Jensen &nbsp;
                    <a className={styles.text} href="/">CONTACT US</a>    
                    {/* replace href with /contact */}
                </p>
                {/* <a className={styles.text} href="contact">CONTACT US</a> */}
                <div style={{display: "inline-flex", justifyContent: "space-around", width: "80%", alignSelf:"center"}}>
                    {/* Add hrefs */}
                    <a className={styles.text} href="https://github.com/JamesHansIV/go-tapeworms">GitHub</a>
                    <a className={styles.text} href="https://api.tapeworms-unlocked.info">API</a>
                    <a className={styles.text} href="/docs">Docs</a>
                </div>
            </div>
            <div className={styles.universitiesContainer}>
                <img className={styles.universityLogo} src={"KU_logo.png"}/>
                <br/>
                <img className={styles.universityLogo} src={"UCONN_logo.png"}/>
            </div>
        </div>
    );
}

export default Footer;