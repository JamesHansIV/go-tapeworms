// import {useState} from "react";

import { CSSProperties } from 'react';
import styles from './FlipUp.module.css';

import cursor from './assets/cursor.png';
import flip_up_7a from './assets/suckers_7a.jpg';
import flip_up_7b from './assets/suckers_7b.jpg';
import flip_up_8a from './assets/suckers_8a.jpg';
import flip_up_8b from './assets/suckers_8b.jpg';

type FlipUpProps =  { 
    flipUp: IFlipUp, 
    state: IFlipUp[],
    setState: React.Dispatch<React.SetStateAction<IFlipUp[]>>,
    index: number,
    pageImgSrc: string
}

const FlipUp = (props: FlipUpProps) => {

    const handleClick = () => {
        console.log("CLICKED");
        console.log(props.flipUp)
        // setOpen(!open)
        if (props.flipUp.open !== true) {
            const newArray = [...props.state];
            newArray[props.index] = {...props.flipUp, open: true};
            props.setState(newArray);
        } else {
            console.log("is closed");
            const newArray = [...props.state];
            newArray[props.index] = {...props.flipUp, open: false};
            props.setState(newArray);
        }
    }

    const borderStyle: any = {
        thickness: 2,
        color: 'red',
    }

    const outerImgTransformOriginUP: string = `0px ${props.flipUp.y}px`;
    const outerImgTransformOriginDOWN: string = `0px ${props.flipUp.y + props.flipUp.height}px`;
    const outerImgDynamicStyle: CSSProperties = {
        position: 'absolute',
        left:`${-props.flipUp.x}px`, 
        top:`${-props.flipUp.y}px`, 
        clipPath: `rect(${props.flipUp.y}px ${props.flipUp.x + props.flipUp.width}px ${props.flipUp.y + props.flipUp.height}px ${props.flipUp.x}px)`,
        transformOrigin: (props.flipUp.direction === EDirection.UP ? outerImgTransformOriginUP : outerImgTransformOriginDOWN),
    }

    const innerBImgStyle: CSSProperties = {
        bottom: (props.flipUp.direction === EDirection.UP ? 0 : 'auto')
    }

    const innerAImgStyle: CSSProperties = {
        bottom: (props.flipUp.direction === EDirection.UP ? 0 : 'auto')
    }

    return (
        <div 
            style={{
                position:'absolute', 
                left:`${props.flipUp.x - borderStyle.thickness}px`, 
                top:`${props.flipUp.y - borderStyle.thickness}px`, 
                width:`${props.flipUp.width}px`, 
                height:`${props.flipUp.height}px`, 
                border:`${borderStyle.thickness}px ${borderStyle.color} solid`,
                cursor: 'pointer'
            }}
            onClick={handleClick}
        >
            
            {/* inside images */}
            <img 
                src={props.flipUp.imgSrc}
                style={innerAImgStyle}
                className={ props.flipUp.direction === EDirection.UP ?
                    (props.flipUp.open === true ? styles.innerAOpenUp : styles.innerAClosedUp) :
                    (props.flipUp.open === true ? styles.innerAOpen : styles.innerAClosed)
                }
            /> 
 
            <img 
                src={props.flipUp.imgSrc}
                style={innerBImgStyle}
                className={ props.flipUp.direction === EDirection.UP ?
                    (props.flipUp.open === true ? styles.innerBOpenUp : styles.innerBClosedUp) :
                    (props.flipUp.open === true ? styles.innerBOpen : styles.innerBClosed)
                }
            />

            {/* outside image */}
            <img
                src={props.pageImgSrc}
                style={outerImgDynamicStyle}
                className={ props.flipUp.direction === EDirection.UP ? 
                    (props.flipUp.open === true ? styles.outerOpenUp : styles.outerClosedUp) :
                    (props.flipUp.open === true ? styles.outerOpen : styles.outerClosed)
                }
            />

            {/* CURSOR ICON CREDIT: https://www.flaticon.com/free-icons/hand-curso */}
            {/* Display if mobile or tablet */}
            {/* <img 
                style={{position: 'absolute', bottom: 5, right: 5, width: 20}}
                src={cursor}
            /> */}
        </div>
    );
}

enum EDirection {
    UP,
    DOWN
};

export interface IFlipUp {
    x: number;
    y: number; // bottom
    width: number;
    height: number;
    imgSrc: string;
    open?: boolean; // defaults to undefined, undefined or false is considered closed
    direction?: EDirection; // NEEDS implementation
};

export const FlipUpData: IFlipUp[] = [
    {
        x: 265,
        y: 210,
        width: 130,
        height: 99,
        imgSrc: flip_up_7a,
        direction: EDirection.UP
    }, {
        x: 280,
        y: 335,
        width: 130,
        height: 100,
        imgSrc: flip_up_7b,
        direction: EDirection.UP
    }, {
        x: 215,
        y: 175,
        width: 120,
        height: 100,
        imgSrc: flip_up_8a,
        direction: EDirection.UP
    }, {
        x: 230,
        y: 410,
        width: 120,
        height: 100,
        imgSrc: flip_up_8b,
        direction: EDirection.UP
    }, {
        x: 275,
        y: 250,
        width: 120,
        height: 100,
        imgSrc: flip_up_7b,
        direction: EDirection.UP
    }, {
        x: 338,
        y: 576,
        width: 120,
        height: 100,
        imgSrc: flip_up_7b,
        direction: EDirection.UP
    }, {
        x: 110,
        y: 105,
        width: 120,
        height: 100,
        imgSrc: flip_up_7b,
        direction: EDirection.UP
    }, {
        x: 230,
        y: 342,
        width: 120,
        height: 100,
        imgSrc: flip_up_7b,
        direction: EDirection.UP
    }, {
        x: 158,
        y: 592,
        width: 120,
        height: 100,
        imgSrc: flip_up_7b,
        direction: EDirection.UP
    }, {
        x: 124,
        y: 156,
        width: 120,
        height: 100,
        imgSrc: flip_up_7b,
        direction: EDirection.UP
    }, {
        x: 165,
        y: 343,
        width: 120,
        height: 100,
        imgSrc: flip_up_7b,
        direction: EDirection.UP
    }, {
        x: 85,
        y: 75,
        width: 120,
        height: 100,
        imgSrc: flip_up_7b,
        direction: EDirection.UP
    }, {
        x: 405,
        y: 475,
        width: 120,
        height: 100,
        imgSrc: flip_up_7b,
        direction: EDirection.UP
    }, {
        x: 165,
        y: 322,
        width: 120,
        height: 100,
        imgSrc: flip_up_7b,
        direction: EDirection.UP
    }, {
        x: 103,
        y: 580,
        width: 120,
        height: 100,
        imgSrc: flip_up_7b,
        direction: EDirection.UP
    }, {
        x: 408,
        y: 592,
        width: 120,
        height: 100,
        imgSrc: flip_up_7b,
        direction: EDirection.UP
    }, {
        x: 430,
        y: 172,
        width: 120,
        height: 100,
        imgSrc: flip_up_7b,
        direction: EDirection.UP
    }, {
        x: 240,
        y: 543,
        width: 120,
        height: 100,
        imgSrc: flip_up_7b,
        direction: EDirection.UP
    }, 
];

export default FlipUp;