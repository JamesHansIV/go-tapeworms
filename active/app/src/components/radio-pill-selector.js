import React, {useEffect, useState} from 'react';
import reactStringReplace from 'react-string-replace';

import styles from './radio-pill-selector.module.css';

function RadioPillSelector(props) {
    const [inputs, setInputs] = useState([]);
    const [sel, setSel] = useState();

    useEffect(()=> {
        setInputs(props.inputDict);
        setSel(props.value);
    },[props.value]);

    const handleClick = (sel, val) => {
        sel === val ? props.setValue(null) : props.setValue(val);
    };

    return (
        <div className={styles.wrapper}>
            <span className={styles.selectionContainer}>
                {
                    Object.entries(inputs).map( ([input_key, input_val]) => {

                        let classes = `${styles.pillButton}`;
                        if (sel === input_val) classes += ` ${styles.selected}`;
                        if (props.orientation === 'vertical') classes += ` ${styles.vertical}`;

                        // handle abbreviations
                        if (props.abbreviation != null) {

                            let abbr_key = Object.keys(props.abbreviation)[0];

                            const reg = RegExp(`\\b(${abbr_key})\\b`,"g");

                            // let test = "uterus extends to GP";



                            return (
                                <span className={ classes } onClick={()=>{handleClick(sel,input_val)}} key={`selector_${input_val}`}>                                     
                                    {
                                        reactStringReplace(input_key, reg, (match, i) => (
                                            // <span key={i} style={{ color: 'red' }}>{match}</span>
                                            <span key={i} 
                                                className={styles.abbreviation}
                                                data-abbr={props.abbreviation[abbr_key]}
                                                >
                                                {match}
                                            </span>
                                          ))
                                    }
                                </span>
                            );
                        } else {
                            return (
                                <span className={ classes } onClick={()=>{handleClick(sel,input_val)}} key={`selector_${input_val}`}> 
                                    {input_key}
                                </span>
                            );
                        }
                    })
                }
            </span>
        </div>
    );
};

export default RadioPillSelector;