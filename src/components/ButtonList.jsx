import React from "react";

export default function ButtonList(props){
    return (
        <div className="buttonList">
            {
                props.buttons.map(button => {
                    return <button style={{
                        background: button.background,
                        color: button.color
                    }} key={button} onClick={button.click}>{button.value}</button>
                })
            }
        </div>
    )
}