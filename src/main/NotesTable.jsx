import React, { useState } from "react";

import tagBackgroundIcon from "../tagBackground.png"
import tagIcon from "../tag.png"
import ThreePoints from "../points.png"
import NoteSettings from "./NoteSettings";

export default function NotesTable(props){
    const [noteSettingsStyles, setNoteSettingsStyles] = useState({})
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

                    note.tag = props.profileTags.indexOf(note.tag) > -1 ? note.tag : ""

                    return (
                        <div onMouseUp={(e) => {
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