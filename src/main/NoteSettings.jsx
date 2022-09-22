import React from "react";

export default function NoteSettings(props){
    return (
        <div className="noteSettings">
            {
                props.buttons.map(button => {
                    return (
                        <p key={button.title} onClick={() => button.click()}>{button.name}</p>
                    )
                })
            }
        </div>
    )
}