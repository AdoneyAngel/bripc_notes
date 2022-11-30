import React, { useState } from "react";

import tagBackgroundIcon from "../tagBackground.png"
import tagIcon from "../tag.png"
import ThreePoints from "../points.png"
import bookMarkIco from "../bookmark.png"
import checkIcon from "../check.png"
import cloudIcon from "../cloud.png"
import Hammer from "react-hammerjs"
import $ from "jquery"

import NoteSettings from "./NoteSettings";
import { useEffect } from "react";

export default function NoteItem(props){
    const [haveImage, setHaveImage] = useState(false)
    const [imageUrl, setImageUrl] = useState("")

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

    let getImageUrl = async () => {
        const imageList = await props.getNoteImages()

        imageList.map(async (imageObject) => {
            if(imageObject.name == note.title){
                setHaveImage(true)

                const imageObjectUrl = await props.getStorageFile(imageObject.reference)

                setImageUrl(imageObjectUrl)
            }
        })
    }

    getImageUrl()

    let styles = {
        title: haveImage ? {
            background: "#ffffff6b",
            backdropFilter: "blur(3px)",
            borderTopRightRadius: "5px",
            borderBottomRightRadius: "5px",
            marginLeft: "-20px",
            padding: "4px 10px",
            paddingLeft: "20px"
        } : {},
        content: haveImage ? {
            marginTop: "120px",
            height: "320px"
        } : {}
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
                        haveImage ? <div style={{
                            "--gradientColor": `linear-gradient(180deg, transparent 30%, ${note.done ? "var(--task-done)" : "white"})`
                        }} className="headerImage"><img src={imageUrl} /></div> : null
                    }
                    {
                        openSettings && props.noteSel.title == note.title ? <NoteSettings styles={noteSettingsStyles} buttons={settingsButtons(note)} /> : null
                    }
                    {
                        note.task ? <img src={bookMarkIco} alt="" /> : null
                    }
                    
                    <section>
                        <header>
                            <h1 style={styles.title}>{note.title}</h1>
                            <img onClick={(e) => {
                                setOpenSettings(!openSettings); 
                                props.setNoteSel(note);
                                
                                console.log(e.button)

                            }} src={ThreePoints} alt="" />
                        </header>
                        
                        <section style={styles.content}>
                            <textarea  value={note.content} disabled></textarea>
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

/* 

    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: grayscale(1) contrast(100) invert();
*/