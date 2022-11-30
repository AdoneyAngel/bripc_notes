import React, {useState} from "react";

import iconEye from "../eye.png"
import iconEye_closed from "../eye_closed.png"
import iconCheck from "../check.png"

import "../styles/checkbox.css"

//props: checked=boolean, check="show / check / custom", callback=function, style=object

export default function Checkbox(props){

    return (
        props.check == "check" ? check(props) : props.check == "show" ? show(props) : custom(props)
    )
}


let check = (props) => {

    return (
        <div onClick={
            () => {
                props.callback()
            }
        } className="checkbox" style={{
            background: props.checked ? "var(--secondary-color)" : "white",
            ...props.style
        }}>
            <img src={iconCheck} style={{
                opacity: props.checked ? 1 : 0,
                transform: props.checked ? "scale(1)" : "scale(1.4)"
            }} />
        </div>
    )
}

let show = (props) => {

    return (
        <div onClick={
            () => {
                props.callback()
            }
        } className="checkbox" style={{
            background: props.checked ? "var(--secondary-color)" : "white",
            ...props.style
        }}>
            <img style={{
                filter: props.checked ? "invert(1)" : "invert(0)"
            }} src={props.checked ? iconEye : iconEye_closed} />
        </div>
    )
}

let custom = (props) => {

    return (
        <div onClick={
            () => {
                props.callback()
            }
        } className="checkbox" style={{
            background: props.checked ? "var(--secondary-color)" : "white",
            ...props.style
        }}>
            <img style={{
                filter: props.checked ? "invert(1)" : "invert(0)"
            }} src={props.checked ? props.img : props.img} />
        </div>
    )
}