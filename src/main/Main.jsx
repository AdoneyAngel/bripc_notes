import React from "react";
import {BrowserRouter, Routes, Route } from 'react-router-dom'
import {setDoc, doc, collection, onSnapshot} from "firebase/firestore"
import $ from "jquery"

import '../styles/main.css'

import LeftBar from "./LeftBar";
import NotesTable from "./NotesTable";
import SuperiorMainBar from "./SuperiorMainBar";
import CreateNoteDisplay from "./CreateNoteDisplay";
import SetNoteTagDisplay from "./SetNoteTagDisplay";
import UnFocusMainDisplay from "./UnFocusMainDisplay";

export default class Main extends React.Component{

    state = {
        profile: {
            notes: {
                list: [],
                tags: []
            },
            profile: {
                name: "",
                mail: "",
                pass: ""
            }
        },
        writingCreateNote: {
            title: "",
            content: "",
            tag: "",
            task: false,
            done: false
        },
        openCreateNoteDisplay: false,
        openSetNoteTagDisplay: false,
        tagSel: this.props.getCookie("tagSel"),
        noteSel: {},
        openUnFocusMainDisplay: false,
        UnFocusMainDisplayClick: () => {}
    }

    handleWritingCreateNote = (propierty, value) => {
        let newNote = this.state.writingCreateNote

        if(propierty == "title"){
            newNote.title = value
        }else if(propierty == "content"){
            newNote.content = value
        }else if(propierty == "task"){
            newNote.task = value
        }else if(propierty == "tag"){
            newNote.tag = newNote.tag != value ? value : ""
        }

        this.setState({
            writingCreateNote: newNote
        })
    }

    createNote = async () => {

        if(this.state.writingCreateNote.title.length < 1 && this.state.writingCreateNote.content.length < 1){
            return false
        }

        if(this.state.profile.notes.list.filter(note => note.title.toLowerCase() == this.state.writingCreateNote.title.toLocaleLowerCase()).length > 0){
            this.props.notification("This title is already in use, use a diferent title")
            return false
        }

        const userDoc = await this.props.getUserDoc()

        const newNote = {
            content: this.state.writingCreateNote.content,
            done: false,
            task: this.state.writingCreateNote.task,
            tag: this.state.writingCreateNote.tag,
            title: this.state.writingCreateNote.title.trim()
        }

        const profile = this.state.profile

        profile.notes.list.push(newNote)
        
        let create = {
            notes: profile.notes,
            profile: profile.profile
        }

        await setDoc(doc(this.props.db, "users", userDoc), create)

        this.setState({
            openCreateNoteDisplay: false,
            openUnFocusMainDisplay: false,
            UnFocusMainDisplayClick: false
        })
    }

    deleteNote = async (noteTitle) => {
        let profile = this.state.profile
        let newNotesList = this.state.profile.notes.list

        newNotesList = newNotesList.filter(note => note.title != noteTitle)

        profile.notes.list = newNotesList

        const userDoc = await this.props.getUserDoc()

        await setDoc(doc(this.props.db, "users", userDoc), profile)
        
    }

    openCreateNoteDisplay = () => {
        this.setState({
            openCreateNoteDisplay: !this.state.openCreateNoteDisplay,
            openUnFocusMainDisplay: !this.state.openUnFocusMainDisplay,
            UnFocusMainDisplayClick: this.openCreateNoteDisplay
        })
    }

    openSetNoteTagDisplay = () => {
        this.setState({
            openSetNoteTagDisplay: !this.state.openSetNoteTagDisplay,
            openUnFocusMainDisplay: !this.state.openUnFocusMainDisplay,
            UnFocusMainDisplayClick: this.openSetNoteTagDisplay
        })
    }

    async componentDidMount(){
        const userName = this.props.getCookie('userName')
        const userMail = this.props.getCookie('userMail')

        const userDoc = await this.props.getUserDoc()

        this.props.getProfile(userName, userMail).then(result => {
            this.setState({
                profile: result
            })
        })

        const unsub = onSnapshot(doc(this.props.db, "users", userDoc), (doc) => {
            this.setState({
                profile: doc.data()
            })
        });
    }

    setTagSel = (tag) => {
        this.props.setCookie("tagSel", tag)
        this.setState({
            tagSel: tag
        })

        document.querySelector('.tasksTable').scrollTo(10, 10);
    }

    setNoteSel = note => {
        this.setState({
            noteSel: note
        })
    }

    setNoteTag = async (noteTitle, tag) => {

        const userDoc = await this.props.getUserDoc()

        const profile = this.state.profile
        
        profile.notes.list.filter(listed => listed.title == noteTitle)[0].tag = tag
        
        let create = {
            notes: profile.notes,
            profile: profile.profile
        }

        await setDoc(doc(this.props.db, "users", userDoc), create)

        this.openSetNoteTagDisplay()
    }

    render(){
        return (
            <div className="main">
                {
                    this.state.openSetNoteTagDisplay ? <SetNoteTagDisplay openSetNoteTagDisplay={this.openSetNoteTagDisplay} noteTitle={this.state.noteSel.title} setNoteTag={this.setNoteTag} tagSelected={this.state.noteSel.tag} tags={this.state.profile.notes.tags} /> :null
                }
                {
                    this.state.openCreateNoteDisplay ? <CreateNoteDisplay noteSel={this.state.writingCreateNote.tag} createNote={this.createNote} checked={this.state.writingCreateNote.task} tags={this.state.profile.notes.tags} handleWritingCreateNote={this.handleWritingCreateNote}/> : null
                }
                {
                    this.state.openUnFocusMainDisplay ? <UnFocusMainDisplay click={this.state.UnFocusMainDisplayClick} /> : null
                }
                <SuperiorMainBar openCreateNoteDisplay={this.openCreateNoteDisplay}/> 
                <LeftBar setTagSel={this.setTagSel} task={this.state.writingCreateNote.task} tags={this.state.profile.notes.tags}/> 
                <div className="notesListBox">

                    <Routes>
                        <Route path="/" element={<NotesTable deleteNote={this.deleteNote} noteSel={this.state.noteSel} setNoteSel={this.setNoteSel}  openSetNoteTagDisplay={this.openSetNoteTagDisplay} tag={this.state.tagSel} notes={this.state.profile.notes.list}/>}></Route>
                        {this.state.profile.notes.tags.length > 0 ? this.state.profile.notes.tags.map(tag => {
                            return <Route key={tag} path={tag} element={<NotesTable deleteNote={this.deleteNote} noteSel={this.state.noteSel} setNoteSel={this.setNoteSel} openSetNoteTagDisplay={this.openSetNoteTagDisplay} tag={this.state.tagSel}
                                 notes={this.state.profile.notes.list.filter(note => note.tag == this.state.tagSel)}/>}></Route>
                            }) : null}
                    </Routes>

                </div>

            </div>
        )
    }
}