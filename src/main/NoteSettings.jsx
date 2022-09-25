import React from "react";

export default function NoteSettings(props){
    return (
        <div style={props.styles} className="noteSettings">
            {
                props.buttons.map(button => {
                    return (
                        <p onMouseEnter={button.backgroundHover ? (e) => {
                            e.target.style.background = button.backgroundHover
                        } : ()=>{}} onMouseLeave={(e) => {
                            e.target.style.background = "white"
                        }} style={button.styles ? button.styles : {}} key={button.name} onClick={() => button.click()}>{button.name}</p>
                    )
                })
            }
        </div>
    )
}