import React, {useEffect, useState, useRef} from 'react';

import styles from './feature-selector-modal.module.css';
// import styles from './featureSelectorModal.module.css';
import RoundButton from './round-button-close';
import LockButton from './lock-button';

const API_BASE_URL = "https://api.tapeworms-unlocked.info"
// const API_BASE_URL = "http://localhost:8080"

function FeatureSelectorModal (props) {
    // filter states
    const [inputs, setInputs] = useState([]);
    const [sel, setSel] = useState();

    const [hintData, setHintData] = useState([]);

    const [loading, setLoading] = useState(true);

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


    const image_source_base = "https://s3.us-east-2.amazonaws.com/images.tapeworms-unlocked.info/hint_images/";


    const getHintData = async() => {
        const params = Object.keys(inputs);

        if(params.length == 0) return;

        let paramsString = "features[]=" ;
        params.forEach((value,index)=>{
            paramsString += value;
            if (index != params.length - 1) paramsString += ',';
        })
        // console.log("PARAMS", paramsString);
        paramsString = paramsString.replaceAll("/"," ");
        // console.log("param fixed,", paramsString);
        
        // switch to live server
        const response = await fetch(`${API_BASE_URL}/feature_selection_modal_hints?${paramsString}`);
        const data = await response.json();
        // console.log("feature selection modal hint data: ", data);

        setHintData(data);
    }

    useEffect(()=> {
        // setActive(props.active);
        setInputs(props.inputDict);
        setSel(props.value);
        setTopZ(props.topZ);
        setPos({left: props.initPos.x, top: props.initPos.y})

        setEventListeners();

        // console.log(props.initPos)
    }, [props.value]);

    useEffect(()=> {
        getHintData();
    }, [inputs])

    useEffect(()=> {
        if (hintData != null) {
            if (hintData.length > 0) {
                setLoading(false);
            } 
        }
    }, [hintData])

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
        
        // update layer of modal
        props.setTopZ(props.topZ + 1);
        setTopZ(props.topZ);

    }

    const drag = (e) => {
        // prevent text highlighting
        window.getSelection().removeAllRanges();
        // e.preventDefault();
        // e.stopPropagation();

        // stop drag if mouse up or not allowed and not currently dragging
        if ((!mouseDown.current || !draggable) && !isDragging.current) {
            return;
        }

        // issues caused by scroll???

        // update pos
        setPos({left: e.pageX - offset.current.left, top: e.pageY - offset.current.top});

        // record that dragging is ongoing
        isDragging.current = true;
    }

    const dragEnd = () => {
        mouseDown.current = false;
        isDragging.current = false;
    }

    const handlePointerLeave = (e) => {
        if (mouseDown.current !== true && isDragging !== true)
            dragEnd();
        else
            drag(e);
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
        <div className={styles.movableWrapper}
            ref={box}
            style={{left: pos.left, top: pos.top, position:'absolute', zIndex: topZ}}
        >
            <span className={styles.container}>
            {/* <h4 className={styles.windowTitle}>{props.title}</h4> */}
            <span className={styles.icons}>
                {/* <LockButton onClick={toggleLock} locked={locked}/> */}
                <RoundButton onClick={close}/>    
            </span>
            
            { loading === true ? (
                // <p>Loading...</p>
                Object.entries(inputs).map(([index, val]) => {
                    // console.log("INPUT DICT: " + index + ", " + val + "   | sel: " + sel);
                    // console.log(sel + " === " + val + ":   " + (sel === val))

                    let classes = `${styles.panel}`;
                    if (sel === val) { 
                        classes += ` ${styles.selected}`;
                        // console.log("applied style")
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
                                sel === val ? props.setValue(null) : props.setValue(val);
                                console.log(val);
                                if (!locked) close();
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
                    // console.log("CURR: " + JSON.stringify(curr));
                    // console.log("sel: " + sel);
                    let classes = `${styles.panel}`;
                    if (sel === inputs[curr.feature]) classes += ` ${styles.selected}`;

                    // console.log(curr);

                    // setImages(curr);

                    return (
                        <div className={ classes } style={{height: panelSize.height, width: panelSize.width}}key={index}
                            onMouseEnter={ disableDrag }
                            onMouseLeave={ enableDrag }
                            onClick={()=> {
                                if(isDragging.current === true) {
                                    isDragging.current = false; 
                                    return;
                                }
                                // console.log("curr.feature " + curr.feature);
                                // console.log("curr: " + JSON.stringify(curr));
                                // console.log("input[curr.feature]" + inputs[curr.feature]);
                                // console.log(props.setValue);
                                sel === curr ? props.setValue(null) : props.setValue(inputs[curr.feature]);
                                if (!locked) close();
                            }}
                        >
                            <h4 style={{textTransform:'capitalize'}}>{curr.feature}</h4>
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
                            
                            {/* IMAGES */}
                            {/* {
                                Object.entries(curr.images).map(([_index, _image]) => {
                                    return (
                                        <img src={_image.src} 
                                            className={styles.hintImage}
                                            style={{left: _image.x,
                                                    top: _image.y,
                                                    height: _image.height,
                                                    width: _image.width,

                                                }}
                                            alt={'Image Comming Soon'}
                                        />
                                    );
                                })
                            } */}
                            {/* <div className={ styles.hintDefinition }
                                style={{left: curr.definition.x, top: curr.definition.y, width: curr.definition.width }}> */}
                                {/* <p>{curr.definition.text}</p> */}
                                {/* {curr.definition.text.slice(0,6) == "\\u2022" && 
                                    
                                    <ul>
                                        {curr.definition.text.split("\\u2022").map((word) => {
                                            // <li>{word}</li>
                                            console.log(curr.hints.length);
                                            if (word !== "")
                                                return <li>{word}</li>
                                            // return <p>test</p>

                                            // return (<>word</>)
                                        })}
                                    </ul>   
                                }
                            </div> */}
                            {/* HINT CIRCLES, ARROWS, & LABELS */}
                            {/* {
                                Object.entries(curr?.hints).map(([_index, _hint]) => {
                                    return ( 
                                        <>
                                            {getHintLabel(_hint)}
                                            <div className={ styles.helperCircle } 
                                                style={{left: _hint.x, 
                                                    top: _hint.y, 
                                                    height: _hint.height,
                                                    width: _hint.width, 
                                                    transform: `rotate(${_hint.rotate}deg)` 
                                                }}
                                            />
                                        </>
                                    )
                                })
                            }
                            {curr.hints.length != 0 &&
                                <div className={styles.helperText}
                                    style={{left: curr.hints[0]?.label.x, 
                                    top: curr.hints[0]?.label.y, 
                                    width: curr.hints[0]?.label.width}}>
                                    {curr.hints.length != 0 &&
                                        <p>{curr.hints[0]?.label.text}</p>
                                    }
                                </div>
                            }
                            {curr.hints.length != 0 &&
                                <div className={ styles.helperCircle } 
                                    style={{left: curr.hints[0]?.x, 
                                        top: curr.hints[0]?.y, 
                                        height: curr.hints[0]?.height,
                                        width: curr.hints[0]?.width, 
                                        transform: `rotate(${curr.hints[0]?.rotate}deg)` 
                                    }}
                                />
                            } */}
                        </div>
                )})
            )}
            </span>
        </div>
    )
}

export default FeatureSelectorModal