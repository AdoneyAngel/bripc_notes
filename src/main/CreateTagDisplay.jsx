import React, {useState} from "react";

import "../styles/createTagDisplay.css"

import ActionButton from "../components/ActionButton";

export default function CreateTagDisplay(props){

    const [tagName, setTagName] = useState('')

    return (
        <div className="createTagDisplay">
            <input onChange={(e) => setTagName(e.target.value)} type="text" placeholder="New tag" />

            <ActionButton click={() => {props.createTag(tagName)}} type="text" value="Create" styles={{
                width: "auto",
                height: "30px",
                marginLeft: "auto",
                borderRadius: "5px",
                padding: "5px 15px"
            }} />
        </div>
    )
}