import React from "react";

import '../styles/loadingDisplay.css'

import loadingIcon from '../logo-white.png'

export default function LoadingDisplay(){
    return (
        <div className="loadingDisplay">
            <img src={loadingIcon} />
        </div>
    )
} 