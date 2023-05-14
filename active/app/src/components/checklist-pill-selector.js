import React, {useEffect, useState} from 'react';

import styles from './checklist-pill-selector.module.css';

function ChecklistPillSelector(props) {
    const [inputs, setInputs] = useState([]);
    const [selections, setSelections] = useState([]);

    useEffect(()=>{
        setInputs(props.inputDict);
        setSelections(props.value);
    }, [props.value]);

    function handleClick(selected_value) {
        if (selections.includes(selected_value)) {
            props.setValue(selections.filter(e=>e !== selected_value));
        }   else {
            props.setValue([...selections, selected_value]);
        }
    }

    return (
        <div className={styles.wrapper}>
            <span className={styles.selectionContainer}>
                {
                    Object.entries(inputs).map( ([input_key, input_val]) => {

                        let classes = `${styles.pillButton}`;
                        if (selections.includes(input_val)) classes += ` ${styles.selected}`;

                        return (
                            <span className={ classes } onClick={()=>{handleClick(input_val)}} key={`selector_${input_val}`}> 
                                {input_key}
                            </span>
                        );
                    })
                }
            </span>
        </div>
    );
};

export default ChecklistPillSelector;