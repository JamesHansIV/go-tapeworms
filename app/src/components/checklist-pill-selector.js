import React, {useEffect, useState} from 'react';
import DetailedFeatureSelection from './detailed-feature-selection';
import styles from './checklist-pill-selector.module.css';

function ChecklistPillSelector(props) {
    const [inputs, setInputs] = useState([]);
    const [selections, setSelections] = useState([]);

    useEffect(()=>{
        setInputs(props.inputDict);
        setSelections(props.value);
    }, [props.value]);


    // rebuild detailed feature selection to handle checklist
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
                        // 
                        // console.log("input key:", input_key,':', input_val)
                        
                        let inputPair = {};
                        inputPair[input_key] = input_val;
                        // console.log("input pair", inputPair)

                        if (props.hasHints === true) {
                            return (
                                <div style={{ display: 'flex', height: '100%', alignItems:'center', paddingRight:'0.3em' }}>
                                    <span className={ classes } onClick={()=>{handleClick(input_val)}} key={`selector_${input_val}`}>
                                        {input_key}
                                    </span>
                                    <DetailedFeatureSelection
                                        inputDict={inputPair}
                                        value={props.value}
                                        setValue={props.setValue}
                                        featureName={props.featureName}
                                        topModalZ={props.topModalZ}
                                        setTopModalZ={props.setTopModalZ}
                                        browser={props.browser}
                                        isCheckList={true}
                                        hintPanelType={props.hintPanelType}
                                    />
                                </div>
                            );
                        } else {
                            return (
                                <span className={ classes } onClick={()=>{handleClick(input_val)}} key={`selector_${input_val}`}>
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

export default ChecklistPillSelector;