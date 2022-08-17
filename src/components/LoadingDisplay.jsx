import React from "react";

import '../styles/loadingDisplay.css'

import loadingIcon from '../loading.png'

export default function LoadingDisplay(){
    return (
        <div className="loadingDisplay">
            <img src={loadingIcon} />
        </div>
    )
} 