import React from "react";
import { Link } from "react-router-dom";

import "../styles/leftBar.css"

import homeIcon from "../home.png"
import tagIcon from "../tag.png"

import TagsList from "./TagsList";
import ListFolder from "./ListFolder"
import ActionButton from "../components/ActionButton"
import plusIcon from "../plus.png"
import bookMarkIcon from "../bookmark.png"

export default function LeftBar(props){

    const myTaskFolderLinks = [
        "All",
        "Done",
        "Not_done"
    ]

    let leftBarStyle = {
        transform: props.openLeftBarValue ? "translateX(0)" : "translateX(-100%)",
    }

    return (
        <div style={props.isInMobileScreen ? leftBarStyle : {}} className="leftBar">
            <Link onClick={() => props.setTagSel("/")} className="homeLink" to="/main">
                <img src={homeIcon} alt="" />
                <p>HOME</p>
            </Link>
            <ListFolder icon={tagIcon} name="My tags" list={<TagsList tagSettings={true} setBodyClick={props.setBodyClick} deleteTag={props.deleteTag} setTagSel={props.setTagSel} tags={props.tags}/> }/>
            <ListFolder icon={bookMarkIcon} name="My tasks" list={<TagsList tagSettings={false} setBodyClick={props.setBodyClick} deleteTag={props.deleteTag} setTagSel={props.setTagSel} tags={myTaskFolderLinks}/> }/>

            <ActionButton value="Create a new tag" click={() => props.openCreateTagDisplay()} type='image' image={plusIcon} styles={{
                position: "absolute",
                bottom: "0",
                marginLeft: "90%",
                transform: "translate(-100% ,-300%)",
                boxShadow: "#0000002b 0px 0px 12px 3px"
            }}/>
        </div>
    )
}