import React, { useState, useEffect } from 'react';

import styles from './lock-button.module.css';

function LockButton(props) {

    const [locked, setLocked] = useState();

    useEffect(()=>{
        setLocked(props.locked);
    },[props.locked]);

    return (
        <div className={styles.container} >
            <button className={styles.lockButton} onClick={props.onClick}>
                <span className={styles.body}/>
                <span className={locked ? styles.shackleLocked : styles.shackleUnlocked}/>
            </button>
        </div>
        
    );
}

export default LockButton;