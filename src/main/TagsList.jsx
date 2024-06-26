import React, { useState } from "react";
import { Link, useLinkClickHandler } from "react-router-dom";

import ButtonList from "../components/ButtonList";

export default function TagsList(props){

    const [tagSel, setTagSel] = useState('')
    const [tagSettings, setTagSettings] = useState(false)
    const clickDer = (tag) => {

        if(props.tagSettings){
            setTagSettings(!tagSettings)
        }

        props.setBodyClick(()=>{setTagSettings(false)})

        setTagSel(tag)
    }

    return (
        <div className="tagList">
            {
                props.tags.map(tag => {

                    const buttonTagList = [
                        {
                            value: "Delete",
                            background: "var(--color-red)",
                            color: 'white',
                            click: () => props.deleteTag(tag)
                        }
                    ]

                    return (
                        <Link onContextMenu={()=>clickDer(tag)} onClick={() => props.setTagSel(tag)} key={tag} className="tagLink" rel="stylesheet" to={
                            tag === "All" ? "AllTasks" : tag === "Done" ? "DoneTasks" : tag === "Not_done" ? "NotDoneTasks" : tag
                        }>
                            {tag.replace("_", " ")}
                            {
                                tagSel === tag && tagSettings ?
                                <div onClick={()=>setTagSettings(false)} className="tagSettings">
                                    <ButtonList buttons={buttonTagList} />
                                </div> : null                         
                            }

                        </Link>
                    )
                })
            }
        </div>
    )
}