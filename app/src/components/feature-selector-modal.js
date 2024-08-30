import React, {useEffect, useState, useRef} from 'react';

import styles from './feature-selector-modal.module.css';
// import styles from './featureSelectorModal.module.css';
import RoundButton from './round-button-close';
import LockButton from './lock-button';

// const API_BASE_URL = "https://api.tapeworms-unlocked.info"
const API_BASE_URL = "http://localhost:8080"

function FeatureSelectorModal (props) {
    const MOVABLE_WRAPPER_HIT_SLOP = 125; // in px

    // filter states
    const [inputs, setInputs] = useState([]);
    const [sel, setSel] = useState();
    const [selections, setSelections] = useState([]);

    const [hintData, setHintData] = useState([]);

    const [loading, setLoading] = useState(true);

    // movement refs
    const hasMoved = useRef(false);
    const mouseDown = useRef(false);
    const isDragging = useRef(false);
    const draggable = useRef(true);
    const offset = useRef({left: 0, top: 0})
    const box = useRef(null);   // rename to wrapper or hitslop or some shit
    const container = useRef(null);
    const position = useRef({left: 0, top: 0});

    // movement states
    const [pos, setPos] = useState({left: 0, top: 0});
    // const [pos, setPos] = useState();
    const [height, setHeight] = useState(0);
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


    const image_source_base = "https://s3.us-east-2.amazonaws.com/images.tapeworms-unlocked.info/hint_images/";


    const getHintData = async() => {
        // const params = Object.keys(inputs);
        const values = Object.values(inputs);

        if(values.length == 0) return;

        // OLD
        let paramsString = "features[]=" ;
        values.forEach((value,index)=>{
            paramsString += props.featureName + "=" + value;
            if (index != values.length - 1) paramsString += ',';
        })

        
        // switch to live server
        const response = await fetch(`${API_BASE_URL}/feature_selection_modal_hints?${paramsString}`);
        const data = await response.json();
        // console.log("feature selection modal hint data: ", data);

        setHintData(data);
    }

    useEffect(()=>{
        setPos({left: props.initPos.x, top: props.initPos.y});
    },[])

    useEffect(()=> {
        // setActive(props.active);
        setInputs(props.inputDict);
        setSel(props.value);
        setSelections(props.value);
        setTopZ(props.topZ);

        setEventListeners();

        // console.log(props.initPos)
    }, [props.value]);

    useEffect(()=> {
        getHintData();

    }, [inputs]);

    useEffect(()=> {
        if (hintData != null) {
            if (hintData.length > 0) {
                setLoading(false);
            } 
        }

    }, [hintData]);

    useEffect(()=>{
        // const containerBox = container.current.getBoundingClientRect();
        const containerWidth = container.current.clientWidth;
        const containerHeight = container.current.clientHeight;
        box.current.style.width = `${containerWidth + 1.65 * MOVABLE_WRAPPER_HIT_SLOP}px`;
        box.current.style.height = `${containerHeight + 1.65 * MOVABLE_WRAPPER_HIT_SLOP}px`;
    });

    // onclick handlers
    const close = () => props.setActive(false);
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
        // extend height and width
        // console.log("height pre",box.current.getBoundingClientRect());
        // box.current.style.offsetHeight = box.current.style.offsetHeight * 2;
        // console.log("height post",box.current.style.offsetHeight);
        // box.current.style.height = '100px';
        // console.log("dragstart height:",box.current.style.height)

        // prevent drag if not allowed
        if (!draggable.current) 
            return;

        // e.preventDefault();
        // e.stopPropagation();

        mouseDown.current = true;
        hasMoved.current = true;

        // calculate offset
        offset.current.left = e.clientX - box.current.getBoundingClientRect().left;
        offset.current.top = e.clientY - box.current.getBoundingClientRect().top;

        // update position
        setPos({left: e.pageX - offset.current.left, top: e.pageY - offset.current.top});
        position.current.left = e.pageX - offset.current.left;
        position.current.top  = e.pageY - offset.current.top;
        // console.log("drag start pos: ", position.current.left, position.current.top);
        
        // update layer of modal
        props.setTopZ(props.topZ + 1);
        setTopZ(props.topZ);

    }

    const drag = (e) => {
        // prevent text highlighting
        window.getSelection().removeAllRanges();
        // e.preventDefault();
        // e.stopPropagation();/

        // stop drag if mouse up or not allowed and not currently dragging
        if ((!mouseDown.current || !draggable) && !isDragging.current) {
            return;
        }

        // issues caused by scroll???

        // update pos
        setPos({left: e.pageX - offset.current.left, top: e.pageY - offset.current.top});
        position.current.left = e.pageX - offset.current.left;
        position.current.top  = e.pageY - offset.current.top;
        // console.log("drag start pos: ", position.current.left, position.current.top);

        // record that dragging is ongoing
        isDragging.current = true;
    }

    const dragEnd = () => {
        mouseDown.current = false;
        isDragging.current = false;
        // box.current.style.height = '0px';
        // console.log("dragend height:",box.current.style.height);
    }

    const handlePointerLeave = (e) => {
        // e.stopPropagation();
        // return;
        // if less than 50px outside of 
        // if (e.pageX - offset.current.left - pos.left < 120 || e.pageY - offset.current.top - pos.top < 120)
        //     // setTimeout(console.log, 500, "test");
        //     // setTimeout(drag, 100, e);
        //     drag(e);
        // // drag(e);
        // else {
        //     console.log(e.pageX - offset.current.left - pos.left);
        //     dragEnd();

        // }

        dragEnd();
        // console.log("POS", pos.left, pos.top);
        // console.log("Mouse", e.pageX - offset.current.left, e.pageY - offset.current.top);

        // if (mouseDown.current !== true && isDragging !== true)
        //     dragEnd();
        // else
        //     drag(e);
        // dragEnd();
    }

    // param: hint is one item in hint data
    const setImages = (hint) => {
        // Object.en
    }

    const getHintLabel = (hint) => {
        if ("label" in hint) {
            return (
                <div className={styles.helperText}
                    style={{left: hint.label.x, top: hint.label.y, width: hint.label.width}}>
                    <p>{hint.label.text}</p>
                </div>
            )
        }
        return (<></>);
    }

    const handleClick = e => {
        console.log("POS", pos.left, pos.top);
        console.log("Mouse", e.pageX - offset.current.left, e.pageY - offset.current.top);
    }

    const setEventListeners = () => {
        if (props.browser === "Chrome") {
            box.current.addEventListener("pointerdown",(e)=>dragStart(e));
            box.current.addEventListener("pointermove",(e)=>drag(e));
            box.current.addEventListener("pointerup",(e)=>dragEnd(e));
            box.current.addEventListener("pointerleave",(e)=>handlePointerLeave(e));

        }
        if (props.browser === "Firefox") {
            box.current.addEventListener("mousedown",(e)=>dragStart(e));
            box.current.addEventListener("mousemove",(e)=>drag(e));
            box.current.addEventListener("mouseup",(e)=>dragEnd(e));
        }
    }

    // if (active)
    return (
        
        <div 
            className={`${styles.movableWrapper} ${(props.isCheckList === true ? styles.shortWrapper : styles.tallWrapper)}`}
            ref={box}
            style={{left: pos.left, top: pos.top, position:'absolute', zIndex: topZ}}
            // style={{left: position.current.left, top: position.current.top, position:'absolute', zIndex: topZ}}
        >
            
            <span className={styles.container}
                ref={container}
            >
            {/* <h4 className={styles.windowTitle}>{props.title}</h4> */}
                <span className={styles.icons}>
                    {/* <LockButton onClick={toggleLock} locked={locked}/> */}
                    <RoundButton onClick={close}/>    
                </span>
            
            { loading === true ? (
                // <p>Loading...</p>
                Object.entries(inputs).map(([index, curr]) => {
                    
                    let classes = `${styles.panel}`;
                    if (sel === curr.value || selections !== null && selections.includes(curr.value)) {
                        classes += ` ${styles.selected}`;
                    }

                    return (
                        <div className={ classes } style={{height: panelSize.height, width: panelSize.width}}key={index}
                            onMouseEnter={ disableDrag }
                            onMouseLeave={ enableDrag }
                            onClick={()=> {
                                if(isDragging.current === true) {
                                    isDragging.current = false; 
                                    return;
                                }
                                if (props.isCheckList === true) {
                                    if (selections.includes(curr.value)) {
                                        props.setValue(selections.filter(e=>e !== curr.value));
                                    }   else {
                                        props.setValue([...selections, curr.value]);
                                    }
                                } else {
                                    sel === curr.value ? props.setValue(null) : props.setValue(curr.value);
                                }
                                // if (!locked) close();
                            }}
                        >
                            <p>loading...</p>
                        </div>
                    );
                })
            ) : (
                // <p>Loaded...</p>
                // map panels
                Object.entries(hintData).map( ([index, curr]) => {

                    let classes = `${styles.panel}`;
                    if (sel === curr.value || selections !== null && selections.includes(curr.value)) {
                        classes += ` ${styles.selected}`;
                    }

                    return (
                        <div 
                            className={ classes } 
                            style={{height: panelSize.height, width: panelSize.width}}
                            key={index}
                            onMouseEnter={ disableDrag }
                            onMouseLeave={ enableDrag }
                            onClick={()=> {
                                if(isDragging.current === true) {
                                    isDragging.current = false; 
                                    return;
                                }

                                if (props.isCheckList === true) {
                                    if (selections.includes(curr.value)) {
                                        props.setValue(selections.filter(e=>e !== curr.value));
                                    }   else {
                                        props.setValue([...selections, curr.value]);
                                    }
                                } else {
                                    sel === curr.value ? props.setValue(null) : props.setValue(curr.value);
                                }
                                // if (!locked) close();
                            }}
                        >
                            <h4 
                                // style={{textTransform:'capitalize'}}
                                >{Object.keys(inputs)[index]}</h4>
                            <div className={ styles.borderline } />
                            {/* NEW FLATTENED METHOD */}
                            {curr.definition != null &&
                            <div className={ styles.hintDefinition}>
                                {(curr.definition.slice(0,6) != "\\u2022") 
                                    ? (<p>{curr.definition}</p>) 
                                    : (
                                        <ul style={{paddingLeft:'1em'}}>
                                        {curr.definition.split("\\u2022").map((word) => {
                                            // console.log(curr.hints.length);
                                            if (word !== "")
                                                return <li style={{fontSize:'0.875em'}}>{word}</li>

                                            // return 
                                        })}
                                        </ul>
                                    )
                                }
                                {/* <p >{curr.definition}</p> */}
                                {/* {console.log("CURR: " + JSON.stringify(curr))} */}
                                {/* {console.log("DEFINITION: " + curr.definition)} */}
                            </div>
                            }
                            <img 
                                className={ curr.definition != null && curr.definition.length > 0 ? styles.hintImage : styles.hintImageNoDefinition} 
                                src={image_source_base + curr.image_source}
                            />                            
                        </div>
                )})
            )}
            </span>
        </div>
        
    )
}

export default FeatureSelectorModal