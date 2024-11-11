import {forwardRef, useState, useEffect} from "react";
import FlipUp, { IFlipUp } from "./FlipUp.tsx";
import styles from './Page.module.css';

// add event handler to close flipups on page turn

type Ref = HTMLDivElement;
type PageProps = { 
    imgSrc: string, 
    flipUps?: IFlipUp[] 
};

// const HandleFlipUpClick = (flipUp: IFlipUp) => (e: MouseEvent): void => {
//     // e.stopPropagation();
//     // e.preventDefault();
//     // alert("clicked");
//     flipUp.open = flipUp.open === true ? false : true;

//     console.log(e)
//     console.log(flipUp)
//     // console.log("test");

// }

// const BuildFlipUpHTML = (flipUp: IFlipUp) => {
//     const [open, setOpen] = useState(false);

//     const HandleClick = () => {
//         setOpen(!open);
//     }

//     return (
//         <div style={{
//                 position:'absolute', 
//                 left:`${flipUp.x}px`, 
//                 top:`${flipUp.y}px`, 
//                 width:`${flipUp.width}px`, 
//                 height:`${flipUp.height}px`, 
//                 border:'2px green solid',
//                 // background:"green",
//             }}
//             // prevent event propogation
//             onClick={HandleClick}
//             // setFlipUpJSX
//         >
//             <img src={flipUp.imgSrc}
//                 style={{
//                     width:'100%',
//                     display: `${flipUp.open === true ? 'block' : 'none'}`
//                 }}
//             />

//         </div>
//     );
// };

const Page = forwardRef<Ref, PageProps>((props, ref) => {
    const [flipUps, setFlipUps] = useState<IFlipUp[]>([]);
    // const [flipUpJSX, setFlipUpJSX] = useState<JSX.Element[]>([]);

    useEffect(()=> {
        if(props.flipUps !== undefined) {
            setFlipUps(props.flipUps);
        }
    },[props]);

    return (
        <div className={styles.page} ref={ref}>

            {/* add alt text props */}
            <img src={props.imgSrc}/>
            {flipUps.map((f: IFlipUp, i: number) => {
                const f_props = {flipUp: f, state: flipUps, setState: setFlipUps, index: i};
                return(FlipUp(f_props));
            })}
        </div>
     );
});

export default Page;