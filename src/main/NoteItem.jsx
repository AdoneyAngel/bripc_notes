import React, { useState } from "react";

import tagBackgroundIcon from "../tagBackground.png"
import tagIcon from "../tag.png"
import ThreePoints from "../points.png"
import bookMarkIco from "../bookmark.png"
import checkIcon from "../check.png"
import cloudIcon from "../cloud.png"

import NoteSettings from "./NoteSettings";

export default function NoteItem(props){

    let {note, setOpenSettings, 
        openSettings, 
        setNoteSettingsStyles, 
        noteSettingsStyles,
        notesLoading,
        settingsButtons} = props

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
                                    <img onClick={(e) => {
                                        setOpenSettings(!openSettings); 
                                        props.setNoteSel(note);
                                        
                                        console.log(e.button)

                                    }} src={ThreePoints} alt="" />
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
                                        notesLoading.indexOf(note.title) > -1 ? <img className="updatingIcon" src={cloudIcon} /> : null
                                    }
                                    
                                    {
                                        note.task && note.done ? <img className="checkIconTask" src={checkIcon} /> : null
                                    }
                                    
                                </div>


                            </section>
                        </div>
    )
}