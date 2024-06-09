import React from "react";
import { BrowserRouter } from "react-router-dom";

import NavBar from "./nav-bar.js";
import styles from "./header.module.css";

function Header() {
    return (
        // <div className={ styles.container }>
        //     <img className={styles.logo} src={"logo.png"}/>
        //     <div className={ styles.titleContainer }>
        //         <h1 className={ styles.title }>Tapeworms Unlocked</h1>
        //         <h3 className={ styles.subtitle }>An interactive identification key to elasmobranch tapeworms</h3>
        //     </div>
        //     {/* <div className={ styles.navContainer }>
        //         <BrowserRouter>
        //             <NavBar/>
        //         </BrowserRouter>
        //     </div> */}
        // </div>
        <div className={styles.containerGrid}>
            <img src={"logo.png"} className={styles.logo}/>
            <div className={styles.headerContent}>
                <div className={styles.titleContainer}>
                    <h1 className={styles.title}>Tapeworms Unlocked</h1>
                    <h3 className={styles.subtitle}>An interactive identification key to elasmobranch tapeworms</h3>
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