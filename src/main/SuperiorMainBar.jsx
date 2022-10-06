import React from "react";
import plusIcon from "../plus.png"

import "../styles/superiorMainBar.css"

export default function SuperiorMainBar(props){

    let sandwichBar1Stile = {
        transform: props.openLeftBarValue ? "rotate(40deg)" : "rotate(0deg)",
        marginTop: props.openLeftBarValue ? "0" : "-14px",
    }
    let sandwichBar2Stile = {
        transform: props.openLeftBarValue ? "rotate(-40deg)" : "rotate(0deg)",
        opacity: props.openLeftBarValue ? 0 : 1
    }
    let sandwichBar3Stile = {
        transform: props.openLeftBarValue ? "rotate(-40deg)" : "rotate(0deg)",
        marginTop: props.openLeftBarValue ? "0" : "15px",
    }

    return (
        <div className="superiorMainBar">
            {
                props.isInMobileScreen ? <button onClick={() => props.openLeftBar()} className="openLeftBarButton">
                                            <div style={sandwichBar1Stile} className="sandwichBar1"></div>
                                            <div style={sandwichBar2Stile} className="sandwichBar2"></div>
                                            <div style={sandwichBar3Stile} className="sandwichBar3"></div>
                                        </button> : null
            }
            <button className="createNoteButton" onClick={() => props.openCreateNoteDisplay()}>
                <img src={plusIcon} alt="" />
            </button>
        </div>
    )
}