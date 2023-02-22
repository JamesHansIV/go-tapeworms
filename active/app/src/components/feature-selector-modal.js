import React, {useEffect, useState} from 'react';

// import styles from './feature-selector-modal.module.css';
import styles from './feature-selector-modal.module.css';

function FeatureSelectorModal (props) {
    // const [mode, setMode] = useState(false)

    const [active, setActive] = useState(true);

    const [inputs, setInputs] = useState([]);
    const [sel, setSel] = useState();

    useEffect(()=> {
        // setActive(props.active);
        setInputs(props.inputDict);
        setSel(props.value);
    }, [props.value]);

    // if (active)
    return (
            <span className={styles.container}>
                {
                    // map panels
                    Object.entries(inputs).map( ([index, val]) => {
                        let classes = `${styles.panel}`;
                        if (sel === val) classes += ` ${styles.selected}`;

                        let borderline = '';
                        
                        return (
                            <div className={ classes }
                                style={{border: index !== inputs.length - 1 ? borderline : 'none' }}
                                onClick={()=> {
                                    sel === val ? props.setValue(null) : props.setValue(val);
                                    setActive(false);
                                }}
                            >
                                <h4>{val}</h4>
                                {/* <img src={`${process.env.PUBLIC_URL}/images/test.jpg`}/> */}
                                <div className={ styles.borderline } />
                            </div>
                        );
                    
                    
                    })
                }

            </span>
    )
    // else return;
}

export default FeatureSelectorModal