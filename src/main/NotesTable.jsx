import React, { useState } from "react";

import tagBackgroundIcon from "../tagBackground.png"
import tagIcon from "../tag.png"
import ThreePoints from "../points.png"
import NoteSettings from "./NoteSettings";
import bookMarkIco from "../bookmark.png"
import checkIcon from "../check.png"

export default function NotesTable(props){
    const [noteSettingsStyles, setNoteSettingsStyles] = useState({})
    const [openSettings, setOpenSettings] = useState(false)

    let settingsButtons = (noteToSettings) => {

        let buttons = [
            {
                name: "Delete",
                click: () => {
                    props.deleteNote(noteToSettings.title)
                    setOpenSettings(false)
                },
                backgroundHover: "red"
            },
            {
                name: "Change tag",
                click: () => {
                    props.openSetNoteTagDisplay()
                    props.setNoteSel(noteToSettings)
                }
            }
        ]

        if(noteToSettings.task){
            buttons.push(
                {
                    name: noteToSettings.task && !noteToSettings.done ? "Mark as done" : noteToSettings.task && noteToSettings.done ? "Unmark as done" : "",
                    click: () => {
                        props.changeDoneTask(noteToSettings)
                    }
                }
            )
        }

        return buttons.reverse()
    }

    return (
        <div className="tasksTable">
            <header className="headerNotesTable">
                {
                    props.tag == "/" ? "Home" : props.tag.replace("_", " ")
                }
            </header>
            {

                props.notes.map(note => {

                    note.tag = props.profileTags.indexOf(note.tag) > -1 ? note.tag : ""

                    return (
                        <div style={{
                            "--note-background": note.task && note.done ? "var(--task-done)" : "white",
                            backgroundImage: "url(../bookmark.png)"
                        }} onMouseUp={(e) => {
                            if(e.button === 2){
                                setOpenSettings(!openSettings) 
                                props.setNoteSel(note)

                                props.setBodyClick(() => {
                                    setOpenSettings(false)
                                })

                                setNoteSettingsStyles({
                                    left: e.clientX,
                                    top: e.clientY,
                                    right: 'auto',
                                    position: 'fixed',
                                    animationName: "openNoteSettingsContextMenuAni"
                                })
                            }else{
                                setNoteSettingsStyles({
                                    right: '80px',
                                    position: 'absolute',
                                    animationName: "openNoteSettingsAni"
                                })
                            }
                        }} key={note.title}>
                            {
                                openSettings && props.noteSel.title == note.title ? <NoteSettings styles={noteSettingsStyles} buttons={settingsButtons(note)} /> : null
                            }
                            {
                                note.task ? <img src={bookMarkIco} alt="" /> : null
                            }
                            
                            <section>
                                <header>
                                    <h1>{note.title}</h1>
                                    <img onClick={() => {setOpenSettings(!openSettings); props.setNoteSel(note);}} src={ThreePoints} alt="" />
                                </header>
                                
                                <section>
                                    <textarea value={note.content} disabled></textarea>
                                </section>

                                <div className="underGroup">
                                    <img onClick={() => {
                                    props.openSetNoteTagDisplay()
                                    props.setNoteSel(note)
                                }} src={note.tag ? tagBackgroundIcon : tagIcon} alt="" />
                                
                                    <p  onClick={() => {
                                    props.openSetNoteTagDisplay()
                                    props.setNoteSel(note)
                                }} >{note.tag}</p>
                                    
                                    {
                                        note.task && note.done ? <img className="checkIconTask" src={checkIcon} /> : null
                                    }
                                    
                                </div>


                            </section>
                        </div>
                    )
                })
            } 
            {
                props.notes.length < 1 ? <div style={{
                    height: "100px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"

                }}>
                        <h1 style={{
                            color: "grey",
                            cursor: "default"
                        }}>NOTHING TO SEE</h1>
                    </div>
                 : null              
            }

        </div>
    )
}