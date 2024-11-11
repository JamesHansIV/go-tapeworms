import React from "react";


function Line(props) {
    return (
        <div style={{
            borderTop: `${props.color} solid 8px`,
            // transform: "rotate(57deg)",
            height: "0px",
            width: "600px", 
            padding: "0",
            margin: "0"

        }}
        />
    );
}

export default Line;