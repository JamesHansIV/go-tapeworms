import React, {useEffect, useState} from 'react';
import { BrowserRouter as Link } from 'react-router-dom';


import '../App.css';




function NavBar() {
    return (
        <div className='navbar'>
            <ul>
                <li>
                    <a>Home</a>
                    {/* <Link to='/home'>Home</Link> */}
                </li>
                <li>
                    <a>About</a>
                    {/* <Link to='/about'>About</Link> */}
                </li>
                <li>
                    <a>Key</a>
                    {/* <Link to='/key'>Key</Link> */}
                </li>
                <li>
                    <a>Further Learning</a>
                    {/* <Link to='/further-learning'>Further Learning</Link> */}
                </li>
            </ul>
        </div>
    ) 

}

export default NavBar;