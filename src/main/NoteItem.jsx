import React, { useState } from "react";

import tagBackgroundIcon from "../tagBackground.png"
import tagIcon from "../tag.png"
import ThreePoints from "../points.png"
import bookMarkIco from "../bookmark.png"
import checkIcon from "../check.png"
import cloudIcon from "../cloud.png"
import Hammer from "react-hammerjs"

import NoteSettings from "./NoteSettings";

export default function NoteItem(props){

    let {note, setOpenSettings, 
        openSettings, 
        setNoteSettingsStyles, 
        noteSettingsStyles,
        notesLoading,
        settingsButtons} = props
        
    let hammerOptions = {
        recognizers:{
            press: {
                time: 550
            }
        }
    }

    let hammerPress = () => {
        setOpenSettings(true); 
        props.setNoteSel(note);

        props.setBodyClick(() => {
            setOpenSettings(false)
        })
    }

    let hammerPressup = () => {
        setOpenSettings(true); 
        props.setNoteSel(note);

        props.setBodyClick(() => {
            setOpenSettings(false)
        })
    }


    return (
        <Hammer options={hammerOptions} onPress={() => hammerPress()} onPressUp={() => hammerPressup()}>
            <div className="noteItem" style={{
                    "--note-background": note.task && note.done ? "var(--task-done)" : "white",
                    backgroundImage: "url(../bookmark.png)"
                }} onMouseUp={(e) => {
                    if(e.button === 2 && !openSettings){
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
        </Hammer>
    )
}