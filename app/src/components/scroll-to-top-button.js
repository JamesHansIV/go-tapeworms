import React from 'react';

import styles from './scroll-to-top-button.module.css';

function ScrollToTopButton(props) {

    return (
        <div className={styles.wrapper}>
            <button className={styles.scrollToTopButton} onClick={props.onClick}>
                <span className={styles.arrow}>&#8593;</span>
            </button> 
        </div>
        
    );
}

export default ScrollToTopButton;