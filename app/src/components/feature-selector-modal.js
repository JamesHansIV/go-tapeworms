import React, {useEffect, useState, useRef} from 'react';

import styles from './feature-selector-modal.module.css';
// import styles from './featureSelectorModal.module.css';
import RoundButton from './round-button-close';
import LockButton from './lock-button';

function FeatureSelectorModal (props) {
    // filter states
    const [inputs, setInputs] = useState([]);
    const [sel, setSel] = useState();

    // movement refs
    const hasMoved = useRef(false);
    const mouseDown = useRef(false);
    const isDragging = useRef(false);
    const draggable = useRef(true);
    const offset = useRef({left: 0, top: 0})
    const box = useRef(null);

    // movement states
    const [pos, setPos] = useState({left: 0, top: 0});
    const [topZ, setTopZ] = useState();

    // close-on-click lock
    const [locked, setLocked] = useState(false);

    // panel size
    const panelSize = props.panelSize; // {height: 111, width: 222} 

    // hint components positioning
    const imgSrc = props.imgSrc;
    const imgPos = props.imgPos; // {x: 111, y: 222}
    const imgSize = props.imgSize; // {height: 111, width: 111 }

    const definition = props.definition; // { x:111, y:222, width: 111, text: "hello world" }

    const circle = props.circle; // { x: 111, y: 222, width: 333, height: 444, }

    const helperText = props.helperText; // { x:111, y:222, width: 111, text: "hello world" }

    const hintCircle = props.hintCircle; // { width: 111, hieght: 222, rotation: 333, x: 111, y: 222 }
    const hintCircleLabel = props.hintCircleLabel; // { text: "hellow world", x: 111, y: 222 }
    const hintDescription = props.hintDescription; // { text: "hello world", x: 111, y: 222 } 
    const citationText = props.citationText; 


    useEffect(()=> {
        // setActive(props.active);
        setInputs(props.inputDict);
        setSel(props.value);
        setTopZ(props.topZ);
        setPos({left: props.initPos.x, top: props.initPos.y})

        // console.log(props.initPos)
    }, [props.value]);

    // onclick handlers
    const close = () => props.setActive(false);
    // const close =()=>{console.log("CLOSE")};
    // const toggleLock = () => setLocked(!locked);
    const toggleLock = () =>{setLocked(!locked);console.log("LOCK",locked)}

    // drag enable/disable
    const disableDrag = () => draggable.current = false;
    const enableDrag = () => draggable.current = true;

    // drag functions
    const calcPos = (e) => {
        // calculate offset
        offset.current.left = e.clientX - box.current.getBoundingClientRect().left;
        offset.current.top = e.clientY - box.current.getBoundingClientRect().top;

        // return position
        return {x: e.pageX - offset.current.left, y: e.pageY - offset.current.top}
    }

    const dragStart = (e) => {
        // prevent drag if not allowed
        if (!draggable.current) 
            return;

        mouseDown.current = true;
        hasMoved.current = true;

        // calculate offset
        offset.current.left = e.clientX - box.current.getBoundingClientRect().left;
        offset.current.top = e.clientY - box.current.getBoundingClientRect().top;

        // update position
        setPos({left: e.pageX - offset.current.left, top: e.pageY - offset.current.top});
        
        // update layer of modal
        props.setTopZ(props.topZ + 1);
        setTopZ(props.topZ);
    }

    const drag = (e) => {
        // prevent text highlighting
        window.getSelection().removeAllRanges();

        // stop drag if mouse up or not allowed and not currently dragging
        if ((!mouseDown.current || !draggable) && !isDragging.current)
            return;

        // update pos
        setPos({left: e.pageX - offset.current.left, top: e.pageY - offset.current.top});

        // record that dragging is ongoing
        isDragging.current = true;
    }

    const dragEnd = () => {
        mouseDown.current = false;
        isDragging.current = false;
    }

    // if (active)
    return (
        <div className={styles.movableWrapper}
            onMouseDown={ e => dragStart(e) }
            onMouseMove={ e => drag(e) }
            onMouseUp={ dragEnd }
            ref={box}
            // style={hasMoved.current ? {left: pos.left, top: pos.top, position:'absolute', zIndex: topZ} : { }}
            style={{left: pos.left, top: pos.top, position:'absolute', zIndex: topZ}}
        >
            <span className={styles.container}
                >
                    <h4 className={styles.windowTitle}>{props.title}</h4>
                    <span className={styles.icons}>
                        {/* <LockButton onClick={toggleLock} locked={locked}/> */}
                        <RoundButton onClick={close}/>    
                    </span>
                    
                
                    {
                        // map panels
                        Object.entries(inputs).map( ([index, val]) => {
                            let classes = `${styles.panel}`;
                            if (sel === val) classes += ` ${styles.selected}`;

                            return (
                                <div className={ classes } style={{height: panelSize.height, width: panelSize.width}}key={index}
                                    onMouseEnter={ disableDrag }
                                    onMouseLeave={ enableDrag }
                                    onClick={()=> {
                                        if(isDragging.current === true) {
                                            isDragging.current = false; 
                                            return;
                                        }
                                        sel === val ? props.setValue(null) : props.setValue(val);
                                        if (!locked) close();
                                    }}
                                >
                                    <h4>{val}</h4>
                                    <div className={ styles.borderline } />
                                    <img src={imgSrc}
                                        className={styles.hintImage}
                                        style={{left: imgPos.x,
                                                top: imgPos.y,
                                                height: imgSize.height}}
                                        alt={'Image Comming Soon'}
                                    />
                                    <div className={ styles.hintDefinition }
                                        style={{left: definition.x, top: definition.y, width: definition.width }}>
                                        <p>{definition.text}</p>
                                    </div>
                                    <div className={styles.helperText}
                                        style={{left: helperText.x, top: helperText.y, width: helperText.width}}>
                                        <p>{helperText.text}</p>
                                    </div>
                                    <div className={ styles.helperCircle } 
                                        style={{left: circle.x, 
                                            top: circle.y, 
                                            height: circle.height,
                                            width: circle.width, 
                                            rotate: circle.rotate 
                                        }}
                                    />
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