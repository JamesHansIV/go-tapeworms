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

        // setInitX(e.pageX - (e.clientX - infoButtonRef.current.getBoundingClientRect().left));
        setInitX(document.body.clientWidth / 3 - 150);
        setInitY(e.pageY - (e.clientY - infoButtonRef.current.getBoundingClientRect().top) - 100);
    };


    return (
        <div className={props.isCheckList === true ? styles.checklistContainer : styles.container}>
                <button className={styles.button} onClick={toggleModal} ref={infoButtonRef}>
                    ?
                </button>
            
            
                <div>
                    {/* { selectionExpanded && 
                        <RadioPillSelector 
                            inputDict={props.inputDict}
                            value={props.value}
                            setValue={props.setValue}
                            orientation={'vertical'}
                        />
                    } */}
                    { modalActive &&
                        createPortal(
                            <FeatureSelectorModal
                                isCheckList={props.isCheckList}
                                test={props.test}
                                browser={props.browser}
                                src={['test','test','test']}
                                title={props.title}
                                inputDict={props.inputDict}
                                value={props.value}
                                setValue={props.setValue}
                                featureName={props.featureName}
                                active={true}
                                setActive={setModalActive}
                                topZ = {props.topModalZ}
                                setTopZ={props.setTopModalZ}
                                initPos={{x: initX, y: initY}}

                                // panelsize
                                hintPanelType={props.hintPanelType}
                                panelSize={(props.hintPanelType === 'short' ? {height: 330, width: 300} : {height: 540, width: 300})}
                                // panelSize={{height: 300, width: 150}}

                                // hint components positioning
                                // imgSrc={process.env.PUBLIC_URL+"/apolytic_Acan_nano_Zschocheetal(2011).png"}
                                // imgPos={{x:124, y:62}}
                                // imgSize={{height: 453, width: 99}}

                                // // hintCircle
                                // circle={{x:124, y:361, width:109, height:163, rotate:0}}
                                // // hintCircleLabel
                                // helperText={{x:45, y:388, width:75, text: "proglottid with eggs"}}
                                // // hintDescription
                                // definition={{x:20, y:181, width: 137, text: "= proglottids detach from the posterior of the strobila when they are gravid"}}
                                // citationText
                            />,
                            document.body                    
                        )
                    }
                </div>

        </div>
    )
}

export default DetailedFeatureSelection;