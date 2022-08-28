import React from "react";

export default function ListFold(props){
    return (
        <div className="tagsListFolder">
            <img src={props.icon} alt="" />
            <p>{props.name}</p>
            <section>
                {
                    props.list
                }
            </section>
        </div>
    )
}