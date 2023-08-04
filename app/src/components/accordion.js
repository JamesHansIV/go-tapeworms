import React, {useState, useRef, useEffect} from 'react'

import AccordionButton from './accordion-button';
import styles from './accordion.module.css';

function Accordion (props) {
    const [open, setOpen] = useState(true);
    const contentRef = useRef(null);
    const firstRender = useRef(true);


    const toggleOpen = () => {
        console.log("toggling")
        setOpen(!open);
    }

    // const setInitialHeight = () => {
    //     console.log("OPEN INIT", props.openInitially);
    //     if (props.openInitially === true) {
    //         // contentRef.current.style.maxHeight = null;
    //     } else {
    //         contentRef.current.style.maxHeight = "0px";
    //     }
    // }

    const setMaxHeight = () => {
        if (open === false)
            contentRef.current.style.maxHeight = "0px";
        else
            contentRef.current.style.maxHeight = "1000px";
            //contentRef.current.scrollHeight + "px"
    }

    const toggleFirstRender = () => {
        if (firstRender.current === true)
            firstRender.current = false;
    }

    useEffect(()=> {
        // if (firstRender.current === true) {
        //     setInitialHeight();

        //     // disable first render
        //     firstRender.current = false;
        // } else {
            setMaxHeight();
        // }
    },[open]);

    return (

        <>
            
            <h5>
                <span className={styles.buttonWrapper} onClick={toggleOpen}>
                    <AccordionButton open={open}/>
                </span>
                {props.header}
            </h5>
            

            <div ref={contentRef} className={styles.content}>
                {props.children}
            </div>
        </>
    );

}

export default Accordion;