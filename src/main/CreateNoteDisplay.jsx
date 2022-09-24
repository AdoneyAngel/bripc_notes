import React from "react";

import "../styles/createNoteDisplay.css"

import Checkbox from "../components/Checkbox";
import TagIcon from "../tag.png"
import TagIconBackground from "../tagBackground.png"

export default function CreateNoteDisplay(props){

        return (
            <div className="createNoteDisplay">
                <form onSubmit={(e) => {
                    e.preventDefault()
                }}>
                    <section>

                        <label className="createNoteDisplayFirstLabel">
                            <input onChange={(e) => {
                                props.handleWritingCreateNote(e.target.name, e.target.value)
                            }} type="text" name="title" placeholder="Type the note title" required/>

                            <section>
                                <p>Task</p>
                                <Checkbox style={{
                                    width: "14px",
                                    height: "14px"
                                }} callback={() => props.handleWritingCreateNote("task", !props.checked)} checked={props.checked} check="check"/>
                            </section>
                            
                        </label>
                        <label className="createNoteDisplaySecondLabel">
                            <textarea  onChange={(e) => {
                                props.handleWritingCreateNote(e.target.name, e.target.value)
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
                                            props.handleWritingCreateNote("tag", tag)
                                        }}> <img style={{
                                            opacity: props.noteSel === tag ? 1 : 0
                                        }} src={TagIconBackground} alt="" /> {tag}</p>
                                    )
                                })
                            }
                        </section>
                    </div>
                    <button onClick={() => {
                        props.createNote()
                    }}>Create</button>
                </form>
            </div>
        )
}