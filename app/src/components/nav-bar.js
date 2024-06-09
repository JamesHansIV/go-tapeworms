import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from "./nav-bar.module.css";


function NavBar() {

    return (
        <div className={styles.container}>
            <ul className={styles.listContainer}>
                <li className={styles.list}>
                    <NavLink 
                        to='/home' 
                        reloadDocument
                        className={ ({isActive}) => isActive ? styles.activeLink : styles.link }
                        style={{width: 65}}
                        >Home
                    </NavLink>
                </li>
                <li className={styles.list}>
                    <NavLink 
                        to='/about' 
                        reloadDocument
                        className={ ({isActive}) => isActive ? styles.activeLink : styles.link }
                        style={{width: 65}}
                        >About
                    </NavLink>
                </li>
                <li className={styles.list}>
                    <NavLink 
                        to='/elasmobranch-tapeworm-orders' 
                        reloadDocument
                        className={ ({isActive}) => isActive ? styles.activeLink : styles.link }
                        style={{width: 320}}

                        >Elasmobranch Tapeworm Orders
                    </NavLink>
                </li>
                <li className={styles.list}>
                    <NavLink 
                        to='/key'
                        reloadDocument
                        className={ ({isActive}) => isActive ? styles.activeLink : styles.link }
                        style={{width: 150}}

                        >Key to Genera
                    </NavLink>
                </li>
            </ul>
        </div>
    ) 

}

export default NavBar;