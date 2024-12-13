// import {useState} from "react";

import { CSSProperties } from 'react';
import styles from './FlipUp.module.css';

// import cursor from './assets/cursor.png';
import flip_up_7a from './assets/suckers_7a.jpg';
import flip_up_7b from './assets/suckers_7b.jpg';
import flip_up_8a from './assets/suckers_8a.jpg';
import flip_up_8b from './assets/suckers_8b.jpg';
import flip_up_9a from './assets/suckers_9a.jpg';
import flip_up_9b from './assets/suckers_9b.jpg';
import flip_up_10a from './assets/suckers_10a.jpg';
import flip_up_10b from './assets/suckers_10b.jpg';
import flip_up_10c from './assets/suckers_10c.jpg';
import flip_up_11a from './assets/suckers_11a.jpg';
import flip_up_11b from './assets/suckers_11b.jpg';
import flip_up_12a from './assets/suckers_12a.jpg';
import flip_up_12b from './assets/suckers_12b.jpg';
import flip_up_13a from './assets/suckers_13a.jpg';
import flip_up_13b from './assets/suckers_13b.jpg';
import flip_up_13c from './assets/suckers_13c.jpg';
import flip_up_14a from './assets/suckers_14a.jpg';
import flip_up_14b from './assets/suckers_14b.jpg';

type FlipUpProps =  { 
    flipUp: IFlipUp, 
    state: IFlipUp[],
    setState: React.Dispatch<React.SetStateAction<IFlipUp[]>>,
    index: number,
    pageImgSrc: string
}

const FlipUp = (props: FlipUpProps) => {

    const handleClick = () => {
        if (props.flipUp.open !== true) {
            const newArray = [...props.state];
            newArray[props.index] = {...props.flipUp, open: true};
            props.setState(newArray);
        } else {
            const newArray = [...props.state];
            newArray[props.index] = {...props.flipUp, open: false};
            props.setState(newArray);
        }
    }

    const sizeScale: number = 1.25;
    const weightedSize: any = {
        width: props.flipUp.width * sizeScale,
        height: props.flipUp.height * sizeScale,
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
        clipPath: `rect(${props.flipUp.y}px ${props.flipUp.x + weightedSize.width}px ${props.flipUp.y + weightedSize.height}px ${props.flipUp.x}px)`,
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
                width:`${weightedSize.width}px`, 
                height:`${weightedSize.height}px`, 
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
    // page  7
    {
        x: 265,
        y: 200,
        width: 130,
        height: 98,
        imgSrc: flip_up_7a,
        direction: EDirection.UP
    }, {
        x: 280,
        y: 335,
        width: 130,
        height: 98,
        imgSrc: flip_up_7b,
        direction: EDirection.UP
    }, 
    // page 8
    {
        x: 215,
        y: 175,
        width: 130,
        height: 98,
        imgSrc: flip_up_8a,
        direction: EDirection.UP
    }, {
        x: 230,
        y: 390,
        width: 130,
        height: 98,
        imgSrc: flip_up_8b,
        direction: EDirection.UP
    }, 
    // page 9
    {
        x: 275,
        y: 240,
        width: 130,
        height: 98,
        imgSrc: flip_up_9a,
        direction: EDirection.UP
    }, {
        x: 338,
        y: 556,
        width: 130,
        height: 98,
        imgSrc: flip_up_9b,
        direction: EDirection.UP
    }, 
    // page 10
    {
        x: 110,
        y: 125,
        width: 130,
        height: 98,
        imgSrc: flip_up_10a,
        direction: EDirection.UP
    }, {
        x: 230,
        y: 332,
        width: 130,
        height: 98,
        imgSrc: flip_up_10b,
        direction: EDirection.UP
    }, {
        x: 158,
        y: 575,
        width: 130,
        height: 98,
        imgSrc: flip_up_10c,
        direction: EDirection.UP
    }, 
    // page 11
    {
        x: 124,
        y: 156,
        width: 130,
        height: 98,
        imgSrc: flip_up_11a,
        direction: EDirection.UP
    }, {
        x: 165,
        y: 343,
        width: 130,
        height: 98,
        imgSrc: flip_up_11b,
        direction: EDirection.UP
    }, 
    // page 12
    {
        x: 85,
        y: 125,
        width: 130,
        height: 98,
        imgSrc: flip_up_12a,
        direction: EDirection.UP
    }, {
        x: 395,
        y: 465,
        width: 130,
        height: 98,
        imgSrc: flip_up_12b,
        direction: EDirection.UP
    }, 
    // page 13
    {
        x: 165,
        y: 322,
        width: 130,
        height: 98,
        imgSrc: flip_up_13a,
        direction: EDirection.UP
    }, {
        x: 103,
        y: 580,
        width: 130,
        height: 98,
        imgSrc: flip_up_13b,
        direction: EDirection.UP
    }, {
        x: 408,
        y: 592,
        width: 130,
        height: 98,
        imgSrc: flip_up_13c,
        direction: EDirection.UP
    }, 
    // page 14
    {
        x: 430,
        y: 172,
        width: 130,
        height: 98,
        imgSrc: flip_up_14a,
        direction: EDirection.UP
    }, {
        x: 240,
        y: 543,
        width: 130,
        height: 98,
        imgSrc: flip_up_14b,
        direction: EDirection.UP
    }, 
];

export default FlipUp;