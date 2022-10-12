import React, { useState } from "react";

import "../styles/createNoteDisplay.css"

import Checkbox from "../components/Checkbox";
import TagIconBackground from "../tagBackground.png"

export default function EditNoteDisplay(props){

    const [title, setTitle] = useState(props.noteSel.title)
    const [content, setContent] = useState(props.noteSel.content)
    const [tagSel, setTag] = useState(props.noteSel.tag)
    const [task, setTask] = useState(props.noteSel.task)

    const handleChanging = (type, value) => {
        if(type === "title"){
            setTitle(value)
        }else if(type === "content"){
            setContent(value)
        }else if(type === "tag"){
            if(tagSel !== value) setTag(value)
            else setTag("")
        }else if(type === "task"){
            setTask(!task)
        }
    }

    return (
        <div className="editNoteDisplay createNoteDisplay">

            <form onSubmit={(e) => {
                    e.preventDefault()
                }}>
                <section>

                    <label className="createNoteDisplayFirstLabel">
                        <input onChange={(e) => {
                            handleChanging("title", e.target.value)
                        }}value={title} type="text" name="title" placeholder="Type the note title" required/>

                        <section>
                            <p>Task</p>
                            <Checkbox style={{
                                width: "14px",
                                height: "14px"
                            }} callback={() => {
                                handleChanging("task")
                            }} checked={task} check="check"/>
                        </section>
                        
                    </label>
                    <label className="createNoteDisplaySecondLabel">
                        <textarea value={content} onChange={(e) => {
                            handleChanging("content", e.target.value)
                        }} name="content" placeholder="Content of this note" required cols="30" rows="10"></textarea>
                        
                    </label>

                </section>

                <div>
                    <h1>Tags</h1>
                    <section>
                        {
                            props.tags.map(tag => {
                                return (
                                    <p onClick={() => {
                                        handleChanging("tag", tag)
                                    }}> <img style={{
                                        opacity: tagSel === tag ? 1 : 0
                                    }} src={TagIconBackground} alt="" /> {tag}</p>
                                )
                            })
                        }
                    </section>
                </div>
                <button onClick={() => {
                    props.editNote(title, content, tagSel, task)
                    props.closeEditNoteDisplay()
                }}>Create</button>
            </form>
        </div>
    )
}