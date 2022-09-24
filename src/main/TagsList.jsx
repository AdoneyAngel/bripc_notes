import React, { useState } from "react";
import { Link, useLinkClickHandler } from "react-router-dom";

import ButtonList from "../components/ButtonList";

export default function TagsList(props){

    const [tagSel, setTagSel] = useState('')
    const [tagSettings, setTagSettings] = useState(false)
    const clickDer = (tag) => {

        if(tagSettings){
            document.body.onclick = ()=>{setTagSettings(false);return false;}
        }

        setTagSettings(!tagSettings)
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
                        <Link onContextMenu={()=>clickDer(tag)} onClick={() => props.setTagSel(tag)} key={tag} className="tagLink" rel="stylesheet" to={tag}>
                            {tag}
                            {
                                tagSel === tag && tagSettings ?
                                <div className="tagSettings">
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