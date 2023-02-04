import React from "react";
import { BrowserRouter } from "react-router-dom";

import NavBar from "./nav-bar.js";
import styles from "./header.module.css";

function Header() {
    return (
        <div className={ styles.container }>
            <div className={ styles.titleContainer }>
                <h1 className={ styles.title }>Tapeworms Unlocked</h1>
                <h3 className={ styles.subtitle }>Interactive Identification Keys to Tapeworms</h3>
            </div>
            <div className={ styles.navContainer }>
                <BrowserRouter>
                    <NavBar/>
                </BrowserRouter>
            </div>
        </div>
    );
}

export default Header;  