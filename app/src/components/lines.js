import React, {useState, useEffect} from "react";

import Line from "./line.js";

function Lines(props) {
    const [colors, setColors] = useState([]);

    useEffect(()=> {
        setColors(props.order === "reversed" ? props.colors : props.colors.reverse());
        console.log(colors)
    },[])

    return (
        <div style={{transform: `rotate(${props.angle}deg)`}}>
            {colors.map(c => <Line color={c}/>)}
        </div>
    );

}

export default Lines;