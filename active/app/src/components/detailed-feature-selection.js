import React, {useState, useEffect} from 'react';

import styles from './detailed-feature-selection.module.css';
import FeatureSelectorModal from './feature-selector-modal';
import RadioPillSelector from './radio-pill-selector';

function DetailedFeatureSelection (props) {

    const [selectionExpanded, setSelectionExpanded] = useState(false);
    const [modalActive, setModalActive] = useState(false);

    // useEffect()

    const toggleExpansion = () => setSelectionExpanded(!selectionExpanded);
    const toggleModal = () => setModalActive(!modalActive);


    return (
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <h5 className={styles.title}>
                    {props.title}
                    
                    {/* <p>?</p> */}
                </h5>
                <button className={styles.button} onClick={toggleExpansion}>
                    {selectionExpanded ? "Hide" : "Show"}
                </button>
                <button className={styles.button} onClick={toggleModal}>
                    Info
                </button>
            </div>
            
            
                <div>
                    { selectionExpanded && 
                        <RadioPillSelector 
                            inputDict={props.inputDict}
                            value={props.value}
                            setValue={props.setValue}
                            orientation={'vertical'}
                        />
                    }
                    { modalActive &&
                        <FeatureSelectorModal
                            src={['test','test','test']}
                            inputDict={props.inputDict}
                            value={props.value}
                            setValue={props.setValue}
                            active={true}
                            setActive={setModalActive}
                        />                    
                    }
                </div>

        </div>
    )
}

export default DetailedFeatureSelection;