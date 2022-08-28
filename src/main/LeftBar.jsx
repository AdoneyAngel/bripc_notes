import React from "react";
import { Link } from "react-router-dom";

import "../styles/leftBar.css"

import homeIcon from "../home.png"
import tagIcon from "../tag.png"

import TagsList from "./TagsList";
import ListFolder from "./ListFolder"

export default function LeftBar(props){
    return (
        <div className="leftBar">
            <Link onClick={() => props.setTagSel("/")} className="homeLink" to="/main">
                <img src={homeIcon} alt="" />
                <p>HOME</p>
            </Link>
            <ListFolder icon={tagIcon} name="My tags" list={<TagsList setTagSel={props.setTagSel} tags={props.tags}/> }/>
            
        </div>
    )
}