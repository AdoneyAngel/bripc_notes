import React from "react";
import { Link } from "react-router-dom";

import "../styles/leftBar.css"

import homeIcon from "../home.png"
import tagIcon from "../tag.png"

import TagsList from "./TagsList";
import ListFolder from "./ListFolder"
import ActionButton from "../components/ActionButton"
import plusIcon from "../plus.png"

export default function LeftBar(props){
    return (
        <div className="leftBar">
            <Link onClick={() => props.setTagSel("/")} className="homeLink" to="/main">
                <img src={homeIcon} alt="" />
                <p>HOME</p>
            </Link>
            <ListFolder icon={tagIcon} name="My tags" list={<TagsList setTagSel={props.setTagSel} tags={props.tags}/> }/>

            <ActionButton click={() => props.openCreateTagDisplay()} type='image' image={plusIcon} styles={{
                position: "absolute",
                bottom: "0",
                marginLeft: "90%",
                transform: "translate(-100% ,-300%)"
            }}/>
        </div>
    )
}