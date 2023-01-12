import React, {useEffect, useState} from 'react';
import { NavLink } from 'react-router-dom';

import styles from "./nav-bar.module.css";


function NavBar() {

    return (
        <div className={styles.container}>
            <ul className={styles.listContainer}>
                <li className={styles.list}>
                    <NavLink 
                        to='/home' 
                        className={ ({isActive}) => isActive ? styles.activeLink : styles.link }
                        style={{width: 65}}
                        >Home
                    </NavLink>
                </li>
                <li className={styles.list}>
                    <NavLink 
                        to='/about' 
                        className={ ({isActive}) => isActive ? styles.activeLink : styles.link }
                        style={{width: 65}}
                        >About
                    </NavLink>
                </li>
                <li className={styles.list}>
                    <NavLink 
                        to='/key' 
                        className={ ({isActive}) => isActive ? styles.activeLink : styles.link }
                        style={{width: 40}}
                        >Key
                    </NavLink>
                </li>
                <li className={styles.list}>
                    <NavLink 
                        to='/other-resources'
                        className={ ({isActive}) => isActive ? styles.activeLink : styles.link }
                        style={{width: 170}}
                        >Other Resources
                    </NavLink>
                </li>
            </ul>
        </div>
    ) 

}

export default NavBar;