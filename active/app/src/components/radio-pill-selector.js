import React, {useEffect, useState} from 'react';

import styles from './radio-pill-selector.module.css';

function RadioPillSelector(props) {
    const [inputs, setInputs] = useState([]);
    const [sel, setSel] = useState();

    useEffect(()=> {
        setInputs(props.inputDict);
        setSel(props.value);
    },[props.value]);


    return (
        <div className={styles.wrapper}>
            <span className={styles.selectionContainer}>
                {
                    Object.entries(inputs).map( ([key, val]) => {
                        return (
                            <span className={ sel === val ? styles.pillButtonSelected : styles.pillButton }
                                onClick={ ()=> { 
                                    sel === val ? props.setValue(null) : props.setValue(val);
                                }} 
                                key={`selector_${val}`}> {key} </span>
                        );
                    })
                }
            </span>
        </div>
    );
};

export default RadioPillSelector;