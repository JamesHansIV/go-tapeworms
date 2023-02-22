import React, {useEffect, useState} from 'react';

import styles from './radio-pill-selector.module.css';

function RadioPillSelector(props) {
    const [inputs, setInputs] = useState([]);
    const [sel, setSel] = useState();

    let greatestWidth = 0;

    useEffect(()=> {
        setInputs(props.inputDict);
        setSel(props.value);
    },[props.value]);


    return (
        <div className={styles.wrapper}>
            <span className={styles.selectionContainer}>
                {
                    Object.entries(inputs).map( ([key, val]) => {

                        let classes = `${styles.pillButton}`;
                        if (sel === val) classes += ` ${styles.selected}`;
                        if (props.orientation === 'vertical') classes += ` ${styles.vertical}`;

                        return (
                            <span className={ classes }

                                onClick={ ()=> { 
                                    sel === val ? props.setValue(null) : props.setValue(val);
                                }} 
                                key={`selector_${val}`}> {key} 
                            </span>
                            
                        );
                    })
                }
            </span>
        </div>
    );
};

export default RadioPillSelector;