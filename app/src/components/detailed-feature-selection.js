import React, {useState, useRef} from 'react';
import {createPortal} from 'react-dom';

import styles from './detailed-feature-selection.module.css';
import FeatureSelectorModal from './feature-selector-modal';
import RadioPillSelector from './radio-pill-selector';

function DetailedFeatureSelection (props) {

    const [selectionExpanded, setSelectionExpanded] = useState(false);
    const [modalActive, setModalActive] = useState(false);

    const infoButtonRef = useRef();

    const [initX, setInitX] = useState();
    const [initY, setInitY] = useState();

    const toggleExpansion = () => setSelectionExpanded(!selectionExpanded);
    const toggleModal = (e) => { 
        setModalActive(!modalActive);

        setInitX(e.pageX - (e.clientX - infoButtonRef.current.getBoundingClientRect().left) - 200);
        setInitY(e.pageY - (e.clientY - infoButtonRef.current.getBoundingClientRect().top) + 30);
    };


    return (
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <h5 className={styles.title}>
                    {props.title}
                </h5>
                <button className={styles.button} onClick={toggleExpansion}>
                    {selectionExpanded ? "Hide" : "Show"}
                </button>
                <button className={styles.button} onClick={toggleModal} ref={infoButtonRef}>
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
                        createPortal(
                            <FeatureSelectorModal
                                src={['test','test','test']}
                                title={props.title}
                                inputDict={props.inputDict}
                                value={props.value}
                                setValue={props.setValue}
                                active={true}
                                setActive={setModalActive}
                                topZ = {props.topModalZ}
                                setTopZ={props.setTopModalZ}
                                initPos={{x: initX, y: initY}}
                            />,
                            document.body                    
                        )
                    }
                </div>

        </div>
    )
}

export default DetailedFeatureSelection;