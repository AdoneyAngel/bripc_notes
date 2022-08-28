import React from "react";
import plusIcon from "../plus.png"

import "../styles/superiorMainBar.css"

export default function SuperiorMainBar(props){
    return (
        <div className="superiorMainBar">
            <button onClick={() => props.openCreateNoteDisplay()}>
                <img src={plusIcon} alt="" />
            </button>
        </div>
    )
}