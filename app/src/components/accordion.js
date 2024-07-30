import React, {useState, useRef, useEffect} from 'react'

import AccordionButton from './accordion-button';
import styles from './accordion.module.css';

function Accordion (props) {
    const [open, setOpen] = useState(true);
    const [childrenHeight, setChildrenHeight] = useState("");
    const contentRef = useRef(null);
    const firstRender = useRef(true);
    const hasBeenOpenedOrClosed = useRef(false);


    const toggleOpen = () => {
        hasBeenOpenedOrClosed.current = true;
        setOpen(!open);
    }

    const setInitialHeight = () => {
        setOpen(props.openInitially)
    }

    const setMaxHeight = (childrenHeight) => {
        if (open === false)
            contentRef.current.style.maxHeight = "0px";
        else
            contentRef.current.style.maxHeight = "1000px";
            // contentRef.current.style.maxHeight = Math.ceil(childrenHeight) + 20 + "px";
    }

    const toggleFirstRender = () => {
        if (firstRender.current === true)
            firstRender.current = false;
    }

    const transitionEndHandler = (e) => {
        if (e.currentTarget !== e.target) {
            return;
        }
        if (contentRef.current.className.includes("Open")) {
            contentRef.current.style.overflow = "visible";
        }
    }

    const transitionStartHandler = (e) => {
        if (e.currentTarget !== e.target) {
            return;
        }
        if (contentRef.current.className.includes("Close")) {
            contentRef.current.style.overflow = "hidden";
        }
    }

    const sumChildHeights = () => {
        let sum = 0;

        Array.from(contentRef.current.children).map((child)=>{
            const marginBottom = parseFloat(window.getComputedStyle(child).getPropertyValue('margin-bottom'));
            const marginTop = parseFloat(window.getComputedStyle(child).getPropertyValue('margin-top'));
            sum += parseFloat(child.offsetHeight) + marginBottom + marginTop;
        });
        return sum;
    }

    useEffect(()=>{
        setChildrenHeight(sumChildHeights());
        contentRef.current.addEventListener("transitionstart", transitionStartHandler);
    },[]);

    useEffect(()=> {
        if (firstRender.current === true) {
            setInitialHeight();

            // disable first render
            firstRender.current = false;
        } 

        setMaxHeight(childrenHeight);
    },[open]);

    return (
        <>   
            <h5>
                <span className={styles.buttonWrapper} onClick={toggleOpen}>
                    <AccordionButton 
                        open={
                            (props.openInitially === false && hasBeenOpenedOrClosed.current === false)
                                ? false : open
                        }
                    />
                </span>
                {props.header}
            </h5>
            
            <div ref={contentRef} 
                className={`
                    ${(props.openInitially === false && hasBeenOpenedOrClosed.current === false) 
                        ? (props.divider === true)
                            ? styles.initiallyClosedWithDivider
                            : styles.initiallyClosedWithoutDivider
                        : (props.divider === true) 
                            ? (open === true) ? styles.dividerOpen : styles.dividerClosed
                            : (open === true) ? styles.contentOpen : styles.contentClosed
                        // : styles
                    }
                `}
                onTransitionEnd={ e=>transitionEndHandler(e)}
            >
                {props.children}
            </div>
        </>
    );

}

export default Accordion;