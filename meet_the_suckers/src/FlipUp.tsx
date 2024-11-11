// import {useState} from "react";

import flip_up_7a from './assets/suckers_7a.jpg';
import flip_up_7b from './assets/suckers_7b.jpg';

type FlipUpProps =  { 
    flipUp: IFlipUp, 
    state: IFlipUp[],
    setState: React.Dispatch<React.SetStateAction<IFlipUp[]>>,
    index: number
}

const FlipUp = (props: FlipUpProps) => {
    // const [open, setOpen] = useState(false);
    console.log("PROPS",props)
    const handleClick = () => {
        // setOpen(!open)
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

    return (
        <div 
            style={{
                position:'absolute', 
                left:`${props.flipUp.x}px`, 
                top:`${props.flipUp.y}px`, 
                width:`${props.flipUp.width}px`, 
                height:`${props.flipUp.height}px`, 
                border:'2px green solid',
                // background:"green",
            }}
            onClick={handleClick}
        >
            <img src={props.flipUp.imgSrc}
                style={{
                    width:'100%',
                    display: `${props.flipUp.open === true ? 'block' : 'none'}`
                }}
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
    y: number;
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
        height: 95,
        imgSrc: flip_up_7a
    }, {
        x: 280,
        y: 335,
        width: 130,
        height: 95,
        imgSrc: flip_up_7b
    }
];

export default FlipUp;