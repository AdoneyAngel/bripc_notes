import React, { useState } from "react";
import "../styles/setNoteTagDisplay.css"

import TagBackgroundIcon from "../tagBackground.png"
import TagIcon from "../tag.png"

export default function SetNoteTagDisplay(props){
    const [tagSel, setTagSel] = useState(props.tagSelected)
    return (
        <div className="setNoteTagDisplay">
            <form onSubmit={(e) => {
                e.preventDefault()

                props.setNoteTag(props.noteTitle, tagSel)
            }}>
                <section>

                    <h1>Set tag</h1>
                    <section>
                        <p onClick={() => {
                            setTagSel('')
                        }}><img style={{
                            opacity: tagSel == '' ? 1 : 0
                        }} src={TagIcon} /> Without tag</p>
                        {
                            props.tags.map(tag => {
                                return <p onClick={() => {
                                    setTagSel(tag)
                                }} key={tag}><img style={{
                                    opacity: tagSel == tag ? 1 : 0
                                }} src={TagBackgroundIcon} /> {tag}</p>
                            })
                        }
                    </section>      

                </section>

                <button>Set</button>
            </form>
        </div>
    )
}