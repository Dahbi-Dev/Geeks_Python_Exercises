import React from "react";

export default function ClockItem({ children, index, totalItems, offset, itemLabel}) {

    let angle;
    if (itemLabel === "week") {
        angle = ((90 / totalItems) * (index)); 
    } else {
        angle = ((360 / totalItems) * (index)); 
    }

    const transformStyle = `rotate(${angle}deg) translate(${offset}rem)`;

    return (
        <div
            style={{
                whiteSpace: "nowrap",
                position: "absolute",
                top: "50%",
                left: "50%",
                translate: "0 -50%",
                transform: transformStyle,
                transformOrigin: "center left",
                transition: "transform 1s ease-in-out",
            }}
        >
            {children} 
        </div>
    );
}
