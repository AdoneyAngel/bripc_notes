import React from "react";
import "../styles/actionButton.css"

export default function ActionButton(props){
    return (
        <button onClick={() => props.click()} style={props.styles} className={"actionButton " + props.class}>
            {
                props.type === "image" ? <img title={props.value} src={props.image}/> : props.value
            }
        </button>
    )
}