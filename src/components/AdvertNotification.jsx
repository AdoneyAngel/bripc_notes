import React from "react";

import advertIcon from "../advertColorBackground.png"

import "../styles/advertNotification.css"

export default function AdvertNotification(props){

    return (
        <div className="advertNotification">
            <h1>{props.title}</h1>
            <p>{props.content}</p>
            <img src={advertIcon} alt="" />
        </div>
    )
}