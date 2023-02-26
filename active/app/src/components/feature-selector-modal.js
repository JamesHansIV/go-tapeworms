import React, {useEffect, useState, useRef} from 'react';

// import styles from './feature-selector-modal.module.css';
import styles from './feature-selector-modal.module.css';
import icons from './icons.module.css';

function FeatureSelectorModal (props) {
    // filter states
    const [inputs, setInputs] = useState([]);
    const [sel, setSel] = useState();

    // movement vars, states, ref
    const hasMoved = useRef(false);
    const mouseDown = useRef(false);
    const offset = useRef({left: 0, top: 0})
    const box = useRef(null);

    const [pos, setPos] = useState({left: 0, top: 0});
    const [local, setLocal] = useState({left: 0, top: 0});
    // let mouseDown = false;



    useEffect(()=> {
        // setActive(props.active);
        setInputs(props.inputDict);
        setSel(props.value);
    }, [props.value]);

    const close = () => props.setActive(false);

    // drag functions
    const dragStart = (e) => {
        console.log("Drag Start");
        mouseDown.current = true;
        hasMoved.current = true;

        offset.current.left = e.clientX - e.target.getBoundingClientRect().left;
        offset.current.top = e.clientY - e.target.getBoundingClientRect().top;
    }

    const drag = (e) => {
        if (!mouseDown.current)
            return;

        setPos({left: e.pageX - offset.current.left, top: e.pageY - offset.current.top});
    }

    const dragEnd = () => {
        console.log("Drag end", pos);
        mouseDown.current = false;
    }

    // if (active)
    return (
        <div className={styles.movableWrapper}
            onMouseDown={ e => dragStart(e) }
            onMouseMove={ e => drag(e) }
            onMouseUp={dragEnd}
            ref={box}
        >
            <span className={styles.container}
                style={hasMoved.current ? {left: pos.left, top: pos.top, position:'absolute'} : {}}>
                    <span className={icons.closeWrapper}>
                        <span className={icons.closeCircle} onClick={close} />
                    </span>
                

                    {
                        // map panels
                        Object.entries(inputs).map( ([index, val]) => {
                            let classes = `${styles.panel}`;
                            if (sel === val) classes += ` ${styles.selected}`;

                            let borderline = '';
                            
                            return (
                                <div className={ classes } key={index}
                                    onClick={()=> {
                                        sel === val ? props.setValue(null) : props.setValue(val);
                                        close();
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
        </div>
            
    )
    // else return;
}

export default FeatureSelectorModal