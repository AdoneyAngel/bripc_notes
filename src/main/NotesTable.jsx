import React, { useState } from "react";

import tagBackgroundIcon from "../tagBackground.png"
import tagIcon from "../tag.png"
import ThreePoints from "../points.png"
import NoteSettings from "./NoteSettings";

export default function NotesTable(props){
    const [openSettings, setOpenSettings] = useState(false)

    let settingsButtons = (noteToSettings) => {
        return [
            {
                name: "Delete",
                click: () => {
                    props.deleteNote(noteToSettings.title)
                    setOpenSettings(false)
                }
            }
        ]
    }

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
                            {
                                openSettings && props.noteSel.title == note.title ? <NoteSettings buttons={settingsButtons(note)} /> : null
                            }
                            
                            <section>
                                <header>
                                    <h1>{note.title}</h1>
                                    <img onClick={() => {setOpenSettings(!openSettings); props.setNoteSel(note);}} src={ThreePoints} alt="" />
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