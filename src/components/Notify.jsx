import React from "react";

import "../styles/notify.css"

export default function Notify(props){
    return (
        <div className="notify">
            <h1>{props.text}</h1>
        </div>
    )
}