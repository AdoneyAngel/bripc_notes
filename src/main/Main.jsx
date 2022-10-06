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
import CreateTagDisplay from "./CreateTagDisplay";

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
        UnFocusMainDisplayClick: () => {},
        notesLoading: [],
        openLeftBar: false
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
        this.props.setLoadingDisplay()

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

        this.props.stopLoadingDisplay()

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

    deleteTag = async (tagToDelete) => {
        let profile = this.state.profile

        let newTagList = profile.notes.tags.filter(tag => tag != tagToDelete)

        profile.notes.tags = newTagList

        const userDoc = await this.props.getUserDoc()

        await setDoc(doc(this.props.db, "users", userDoc), profile)

        window.location = "/main"
    }

    createTag = async (newTag) => {

        const invalidsNewTags = [
            "all",
            "done",
            "not_done",
            "not done",
            "notdone"
        ]

        let profile = this.state.profile

        profile.notes.tags.map(tag => {
            if(tag.toLowerCase() == newTag.toLowerCase()){
                this.props.notification("A tag with that name already exists")

                return false
            }
        })
        
        if(newTag.length <= 2){
            this.props.notification("The tag name must be more than 2 characteres")

            return false
        }else if(newTag.indexOf(" ") > -1){
            this.props.notification("The tag name mustn`t have empty space")

            return false
        }else if(invalidsNewTags.indexOf(newTag.toLocaleLowerCase()) > -1){
            this.props.notification("The tag name isn't valid")

            return false
        }

        this.props.setLoadingDisplay()
        
        let newTagList = profile.notes.tags
        newTagList.push(newTag)

        profile.notes.tags = newTagList

        const userDoc = await this.props.getUserDoc()

        await setDoc(doc(this.props.db, "users", userDoc), profile)

        this.props.stopLoadingDisplay()

        this.openCreateTagDisplay()
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

    openCreateTagDisplay = () => {
        this.setState({
            openCreateTagDisplay: !this.state.openCreateTagDisplay,
            openUnFocusMainDisplay: !this.state.openUnFocusMainDisplay,
            UnFocusMainDisplayClick: this.openCreateTagDisplay
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

    openLeftBar = () => {
        this.setState({
            openLeftBar: !this.state.openLeftBar 
        })
    }

    setTagSel = (tag) => {
        if(this.state.profile.notes.tags.indexOf(tag) < 0 && tag != "/" && !["Alltasks", "DoneTasks", "notDoneTasks"].indexOf(tag)) return false

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

    changeDoneTask = async (task) => {
        let profile = this.state.profile

        profile.notes.list.map(note => {
            if(note.title == task.title){
                note.done = !note.done
            }
        })

        const userDoc = await this.props.getUserDoc()

        this.addNoteLoading(task.title)

        await setDoc(doc(this.props.db, "users", userDoc), profile)

        this.deleteNoteLoading(task.title)
    }

    changeAsTask = async (noteToChange, value) => {
        let profile = this.state.profile

        profile.notes.list.map(note => {
            if(note.title == noteToChange.title){
                note.task = value
                note.done = false
            }
        })

        const userDoc = await this.props.getUserDoc()

        this.addNoteLoading(noteToChange.title)

        await setDoc(doc(this.props.db, "users", userDoc), profile)

        this.deleteNoteLoading(noteToChange.title)

    }

    addNoteLoading = (noteTitle) => {
        if(this.state.notesLoading.indexOf(noteTitle) < 0){

            let notesLoading = this.state.notesLoading

            notesLoading.push(noteTitle)
    
            this.setState({
                notesLoading: notesLoading
            })
        }
    }

    deleteNoteLoading = (noteTitle) => {
        if(this.state.notesLoading.indexOf(noteTitle) > -1){

            let notesLoading = this.state.notesLoading

            notesLoading = notesLoading.filter(note => note != noteTitle)
    
            this.setState({
                notesLoading: notesLoading
            })
        }
    }

    render(){
        document.body.onclick = () => {}

        let allTasks = {
            all: this.state.profile.notes.list.filter(note => note.task),
            done: this.state.profile.notes.list.filter(note => note.task && note.done),
            notDone: this.state.profile.notes.list.filter(note => note.task && !note.done)
        }
        
        return (
            <div className="main">
                {
                    this.state.openCreateTagDisplay ? <CreateTagDisplay createTag={this.createTag} /> : null
                }
                {
                    this.state.openSetNoteTagDisplay ? <SetNoteTagDisplay openSetNoteTagDisplay={this.openSetNoteTagDisplay} noteTitle={this.state.noteSel.title} setNoteTag={this.setNoteTag} tagSelected={this.state.noteSel.tag} tags={this.state.profile.notes.tags} /> :null
                }
                {
                    this.state.openCreateNoteDisplay ? <CreateNoteDisplay noteSel={this.state.writingCreateNote.tag} createNote={this.createNote} checked={this.state.writingCreateNote.task} tags={this.state.profile.notes.tags} handleWritingCreateNote={this.handleWritingCreateNote}/> : null
                }
                {
                    this.state.openUnFocusMainDisplay ? <UnFocusMainDisplay click={this.state.UnFocusMainDisplayClick} /> : null
                }
                <SuperiorMainBar openLeftBar={this.openLeftBar} openLeftBarValue={this.state.openLeftBar} isInMobileScreen={this.props.isInMobileScreen} openCreateNoteDisplay={this.openCreateNoteDisplay}/> 
                <LeftBar isInMobileScreen={this.props.isInMobileScreen} openLeftBar={this.openLeftBar} openLeftBarValue={this.state.openLeftBar} setBodyClick={this.props.setBodyClick} deleteTag={this.deleteTag} openCreateTagDisplay={this.openCreateTagDisplay} setTagSel={this.setTagSel} task={this.state.writingCreateNote.task} tags={this.state.profile.notes.tags}/> 
                <div className="notesListBox">

                    <Routes>
                        <Route path="/" element={<NotesTable notesLoading={this.state.notesLoading} noteIsLoading={this.state.noteIsLoading} changeAsTask={this.changeAsTask} changeDoneTask={this.changeDoneTask} setBodyClick={this.props.setBodyClick} profileTags={this.state.profile.notes.tags} deleteNote={this.deleteNote} noteSel={this.state.noteSel} setNoteSel={this.setNoteSel}  openSetNoteTagDisplay={this.openSetNoteTagDisplay} tag={this.state.tagSel} notes={this.state.profile.notes.list}/>}></Route>
                        {this.state.profile.notes.tags.length > 0 ? this.state.profile.notes.tags.map(tag => {
                            return <Route key={tag} path={tag} element={<NotesTable notesLoading={this.state.notesLoading} noteIsLoading={this.state.noteIsLoading} changeAsTask={this.changeAsTask} changeDoneTask={this.changeDoneTask} setBodyClick={this.props.setBodyClick} profileTags={this.state.profile.notes.tags} deleteNote={this.deleteNote} noteSel={this.state.noteSel} setNoteSel={this.setNoteSel} openSetNoteTagDisplay={this.openSetNoteTagDisplay} tag={this.state.tagSel}
                                 notes={this.state.profile.notes.list.filter(note => note.tag == this.state.tagSel)}/>}></Route>
                            }) : null}

                        {
                            //Tasks Links
                        }
                        <Route path="AllTasks" element={<NotesTable notesLoading={this.state.notesLoading} noteIsLoading={this.state.noteIsLoading} changeAsTask={this.changeAsTask} changeDoneTask={this.changeDoneTask} setBodyClick={this.props.setBodyClick} profileTags={this.state.profile.notes.tags} deleteNote={this.deleteNote} noteSel={this.state.noteSel} setNoteSel={this.setNoteSel}  openSetNoteTagDisplay={this.openSetNoteTagDisplay} tag={this.state.tagSel} notes={allTasks.all}/>}></Route>
                        <Route path="DoneTasks" element={<NotesTable notesLoading={this.state.notesLoading} noteIsLoading={this.state.noteIsLoading} changeAsTask={this.changeAsTask} changeDoneTask={this.changeDoneTask} setBodyClick={this.props.setBodyClick} profileTags={this.state.profile.notes.tags} deleteNote={this.deleteNote} noteSel={this.state.noteSel} setNoteSel={this.setNoteSel}  openSetNoteTagDisplay={this.openSetNoteTagDisplay} tag={this.state.tagSel} notes={allTasks.done}/>}></Route>
                        <Route path="NotDoneTasks" element={<NotesTable notesLoading={this.state.notesLoading} noteIsLoading={this.state.noteIsLoading} changeAsTask={this.changeAsTask} changeDoneTask={this.changeDoneTask} setBodyClick={this.props.setBodyClick} profileTags={this.state.profile.notes.tags} deleteNote={this.deleteNote} noteSel={this.state.noteSel} setNoteSel={this.setNoteSel}  openSetNoteTagDisplay={this.openSetNoteTagDisplay} tag={this.state.tagSel} notes={allTasks.notDone}/>}></Route>
                        
                    </Routes>

                </div>

            </div>
        )
    }
}