import React from "react";
import { Link } from "react-router-dom";

export default function TagsList(props){
    return (
        <div className="tagList">
            {
                props.tags.map(tag => {
                    return (
                        <Link onClick={() => props.setTagSel(tag)} key={tag} className="tagLink" rel="stylesheet" to={tag}>{tag}</Link>
                    )
                })
            }
        </div>
    )
}