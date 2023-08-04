import React from 'react';

import styles from './accordion-button.module.css';

function AccordionButton(props) {

    return (
        <span className={styles.arrow}>
            <span className={props.open ? styles.leftOpen : styles.left}/>
            <span className={props.open ? styles.rightOpen : styles.right}/>
        </span>
    );
}

export default AccordionButton;