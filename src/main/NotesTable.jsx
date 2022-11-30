import React, { useState, useEffect } from "react";

import NoteItem from "./NoteItem";

export default function NotesTable(props){
    const [noteSettingsStyles, setNoteSettingsStyles] = useState({})
    const [openSettings, setOpenSettings] = useState(false)
    const [noteImages, setNoteImages] = useState([])

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
            },
            {
                name: noteToSettings.task ? "Change as note" : "Change as task",
                click: () => {
                    props.changeAsTask(noteToSettings, !noteToSettings.task)
                }
            },
            {
                name: "Edit",
                click: () => {
                    props.openEditNoteDisplay()
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

    let getNoteImages = async () => {
        let imageList = []
        
        const userDoc = await props.getUserDoc()

        const imageReferenceList = await props.getUserFiles(userDoc, "notes")

        imageReferenceList.items.map(item => {
            let newImage = {
                name: item._location.path_.split("/")[item._location.path_.split("/").length-1].split(".")[0],
                reference: item
            }

            imageList.push(newImage)
        })

        return imageList
        
    }

    return (
        <div className="tasksTable">
            <header className="headerNotesTable">
                {
                    props.tag == "/" ? "Home" : props.tag ? props.tag.replace("_", " ") : ""
                }
            </header>
            {

                props.notes.map(note => {

                    note.tag = props.profileTags.indexOf(note.tag) > -1 ? note.tag : ""

                    return (
                        <NoteItem
                        getStorageFile={props.getStorageFile}
                        getNoteImages={getNoteImages}
                        changeAsTask={props.changeAsTask} 
                        changeDoneTask={props.changeDoneTask} 
                        profileTags={props.profileTags} 
                        settingsButtons={settingsButtons} 
                        setBodyClick={props.setBodyClick}
                        noteSettingsStyles={noteSettingsStyles} 
                        setNoteSettingsStyles={setNoteSettingsStyles} 
                        openSettings={openSettings} 
                        deleteNote={props.deleteNote}
                        note={note}
                        noteSel={props.noteSel}
                        setNoteSel={props.setNoteSel}
                        openSetNoteTagDisplay={props.openSetNoteTagDisplay}
                        tag={props.tag}
                        notes={props.notes}
                        noteIsLoading={props.noteIsLoading}
                        notesLoading={props.notesLoading}
                        setOpenSettings={setOpenSettings}/>
                    )
                })
            } 
            {
                props.notes.length < 1 ? <div style={{
                    height: "100px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "white"

                }}>
                        <h1 style={{
                            color: "grey",
                            cursor: "default",
                            userSelect: "none"
                        }}>NOTHING TO SEE</h1>
                    </div>
                 : null              
            }

        </div>
    )
}