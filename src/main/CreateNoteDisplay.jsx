import React from "react";

import "../styles/createNoteDisplay.css"

import Checkbox from "../components/Checkbox";
import TagIconBackground from "../tagBackground.png"
import taskIcon from "../bookmark.png"

export default function CreateNoteDisplay(props){

        return (
            <div className="createNoteDisplay">
                
                <form onSubmit={(e) => {
                    e.preventDefault()
                }}>

                    <section>

                        <label className="createNoteDisplayFirstLabel">
                            <section>
                                <Checkbox style={{
                                    width: "18px",
                                    height: "18px"
                                }} callback={() => props.handleWritingCreateNote("task", !props.checked)} checked={props.checked} check="custom" img={taskIcon}/>
                            </section>
                            
                            <input onChange={(e) => {
                                props.handleWritingCreateNote(e.target.name, e.target.value)
                            }} type="text" name="title" placeholder="Type the note title" required/>

                            <div className="NoteImageSelect">

                                <input className="selectNoteImageInput" name="image" width="0px" accept=".jpg" type="file" onChange={(e) => {
                                    props.handleWritingCreateNote(e.target.name, e.target.files[0])
                                }} />
                                
                            </div>
                            
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

                {
                    props.checked ? <div className="createNoteDisplayIconBackground">
                                        <img src={taskIcon} />
                                      </div> : null
                }

                
            </div>
        )
}