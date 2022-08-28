import React, { useEffect } from "react";

import tagBackgroundIcon from "../tagBackground.png"
import tagIcon from "../tag.png"

export default function NotesTable(props){

    return (
        <div className="tasksTable">
            <header className="headerNotesTable">
                {
                    props.tag == "/" ? "Home" : props.tag
                }
            </header>
            {
                props.notes.map(note => {
                    return (
                        <div key={note.title}>
                            <section>
                                <header>
                                    <h1>{note.title}</h1>
                                </header>
                                
                                <section>
                                    <p>{note.content}</p>
                                </section>

                                <div onClick={() => {
                                    props.openSetNoteTagDisplay()
                                    props.setNoteSel(note)
                                }} className="underGroup">
                                    <img src={note.tag ? tagBackgroundIcon : tagIcon} alt="" />
                                    <p>{note.tag}</p>
                                </div>


                            </section>
                        </div>
                    )
                })
            }
        </div>
    )
}