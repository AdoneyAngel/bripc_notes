import React from "react";

export default function NoteSettings(props){
    return (
        <div style={props.styles} className="noteSettings">
            {
                props.buttons.map(button => {
                    return (
                        <p key={button.name} onClick={() => button.click()}>{button.name}</p>
                    )
                })
            }
        </div>
    )
}