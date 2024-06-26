import React, {useEffect, useState, useRef} from 'react';
import reactStringReplace from 'react-string-replace';
import {createPortal} from 'react-dom';

import styles from './radio-pill-selector.module.css';

function RadioPillSelector(props) {
    const [inputs, setInputs] = useState([]);
    const [sel, setSel] = useState();

    const tooltipRef = useRef();

    useEffect(()=> {
        setInputs(props.inputDict);
        setSel(props.value);
    },[props.value]);

    const handleClick = (sel, val) => {
        sel === val ? props.setValue(null) : props.setValue(val);
    };

    const checkOverlap = () => {
        let filterbox = document.getElementById("filtercontainer");
        if (tooltipRef.current.right > filterbox.left)
            return "25%"
        if (tooltipRef.current.left < filterbox.right)
            return "75%";
        
        return "50%";
    }

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

                            let abbrClasses = `${styles.abbreviation}`;
                            if (props.shift != null) {
                                if (props.shift === "left")
                                    abbrClasses = `${styles.abbreviationLeft}`;
                                if (props.shift === "right")
                                    abbrClasses = `${styles.abbreviationRight}`;
                            }
                            
                            if (sel === input_val) 
                                abbrClasses += ` ${styles.abbreviationSelected}`;
                            else
                                abbrClasses += ` ${styles.abbreviationUnselected}`;

                            // let test = "uterus extends to GP";
                            const shiftindex = (i) => {
                                if (props.shiftIndex != null) {
                                    if (props.shiftIndex == i) {
                                        return abbrClasses;
                                    }
                                }

                                return `${styles.abbreviation}`
                            }


                            return (
                                <span className={ classes } onClick={()=>{handleClick(sel,input_val)}} key={`selector_${input_val}`}>                                     
                                    {   
                                        reactStringReplace(input_key, reg, (match, i) => (
                                            // <span key={i} style={{ color: 'red' }}>{match}</span>

                                            // check overlap

                                            <span key={i} 
                                                className={abbrClasses}
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