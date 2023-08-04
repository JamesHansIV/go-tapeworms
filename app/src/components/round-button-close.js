import React from 'react';

import styles from './round-button-close.module.css';

function RoundButton(props) {

    return (
        <div className={styles.container} >
            <button className={styles.roundButton} onClick={props.onClick}>
                <span className={styles.crossLeft}/>
                <span className={styles.crossRight}/>
            </button> 
        </div>
        
    );
}

export default RoundButton;