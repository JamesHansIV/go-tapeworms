// import {useState} from "react";

import styles from './FlipUp.module.css';

import flip_up_7a from './assets/suckers_7a.jpg';
import flip_up_7b from './assets/suckers_7b.jpg';

type FlipUpProps =  { 
    flipUp: IFlipUp, 
    state: IFlipUp[],
    setState: React.Dispatch<React.SetStateAction<IFlipUp[]>>,
    index: number,
    pageImgSrc: string
}

const FlipUp = (props: FlipUpProps) => {
    // const [open, setOpen] = useState(false);
    // console.log("PROPS",props)
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

    return (
        <div 
            style={{
                position:'absolute', 
                left:`${props.flipUp.x}px`, 
                top:`${props.flipUp.y}px`, 
                width:`${props.flipUp.width}px`, 
                height:`${props.flipUp.height}px`, 
                // border:'2px green solid',
                // background:"green",
            }}
            onClick={handleClick}
        >
            
            {/* inside images */}
            <img 
                src={props.flipUp.imgSrc}
                className={props.flipUp.open === true ? styles.innerAOpen : styles.innerAClosed}
            /> 
 
            <img 
                src={props.flipUp.imgSrc}
                className={props.flipUp.open === true ? styles.innerBOpen : styles.innerBClosed}
            />

            {/* outside image */}
            <img
                src={props.pageImgSrc}
                style={{
                    // clipPath: `inset(${50}px ${25}px)`,
                    // clipPath: `rect(40px 40px)`
                    position:'absolute', 
                    left:`${-props.flipUp.x}px`, 
                    top:`${-props.flipUp.y}px`, 
                    transformOrigin: `0px ${props.flipUp.y + props.flipUp.height}px`,

                    // flip up transform origin
                    // transformOrigin: `0px ${props.flipUp.y}px`,
                    
                    clipPath: `rect(${props.flipUp.y}px ${props.flipUp.x + props.flipUp.width}px ${props.flipUp.y + props.flipUp.height}px ${props.flipUp.x}px)`
                }}
                className={props.flipUp.open === true ? styles.outerOpen : styles.outerClosed}
            />
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
        // y: 305,
        y: 210,
        width: 130,
        height: 99,
        imgSrc: flip_up_7a
    }, {
        x: 280,
        y: 335, //needs bottom adjustment
        width: 130,
        height: 95,
        imgSrc: flip_up_7b
    }
];

export default FlipUp;