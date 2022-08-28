import React from "react";

import "../styles/unFocusMainDisplay.css"

export default function UnFocusMainDisplay(props){
    return (
        <div onClick={() => props.click()} className="unFocusMainDisplay"></div>
    )
}