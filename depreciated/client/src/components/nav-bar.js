import React, {useEffect, useState} from 'react';
import { NavLink } from 'react-router-dom';


import '../App.css';




function NavBar() {
    return (
        <div className='navbar'>
            <ul>
                <li>
                    <NavLink to='/home'>Home</NavLink>
                </li>
                <li>
                    <NavLink to='/about'>About</NavLink>
                </li>
                <li>
                    <NavLink to='/key'>Key</NavLink>
                </li>
                <li>
                    <NavLink to='/further-learning'>Further Learning</NavLink>
                </li>
            </ul>
        </div>
    ) 

}

export default NavBar;