import { collection, getDocs, addDoc, onSnapshot, doc } from "firebase/firestore"
import React from "react"

import {BrowserRouter, Routes, Route } from 'react-router-dom'

import SignUp from "./sign/signUp/SignUp"
import SignIn from "./sign/signIn/SignIn"
import db from "./databases/db_bripcNotes"
import Notify from "./components/Notify"
import LoadingDisplay from "./components/LoadingDisplay"
import Main from "./main/Main"

import './styles/app.css'

export default class App extends React.Component{

    state = {
        notification: false,
        loading: false,
        user: this.getUserCookie,
        profile: {}
    }

    setLoadingDisplay = () => {
        this.setState({
            loading: true
        })
    }

    stopLoadingDisplay = () => {
        this.setState({
            loading: false
        })
    }

    getBripcNotesUsers = async () => {
        const users = await getDocs(collection(db, 'users'))

        return users.docs
    }

    setCookie(name, value){
        document.cookie = name + "=" + encodeURIComponent( value );
    }
    getCookie(name){
        return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + name.replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
    }

    saveUser = (name, mail) => {
        this.setCookie('userName', name)
        this.setCookie('userMail', mail)
    }
    getUserCookie = () => {
        const userName = this.getCookie('userName')
        const userMail = this.getCookie('userMail')

        return {
            userName: userName,
            userMail: userMail
        }
    }

    signUp = async (name, mail, pass) => {

        name = name.trim()
        mail = mail.trim()

        const newDoc = {
            notes: {
                list: [{
                    content: "welcome to Bripc Notes",
                    done: false,
                    task: false,
                    tag: "welcome",
                    title: "Welcome"
                }],

                tags: [
                    'welcome'
                ]
            },
            profile: {
                mail: mail,
                name: name,
                pass: pass
            }
        }
        await addDoc(collection(db, 'users'), newDoc)
        
        this.saveUser(name, mail)

        window.location = "/main"
    }

    signIn = async (userMail, pass) => {

        userMail = userMail.trim().toLowerCase()

        this.setState({
            loading: true
        })

        this.getBripcNotesUsers().then(result => {

            this.setState({
                loading: false
            })

            const users = result

            let login = users.filter(user => user.data().profile.mail == userMail && user.data().profile.pass == pass).length == 1

            if(login){
                let userName = users.filter(user => user.data().profile.mail.toLowerCase() == userMail && user.data().profile.pass == pass)[0].data().profile.name

                this.saveUser(userName, userMail)

                window.location = "/main"
            }else{
                this.notification('The user mail or password is not valid')
            }
        })
    }

    notification = (text) => {
        this.setState({
            notification: text
        }, () => {
            setTimeout(() => {
                this.setState({
                    notification: false
                })
            }, 2500)
        })
    }

    getProfile = async (name, mail) => {

        const users = await this.getBripcNotesUsers()

        const profile = users.filter(user => user.data().profile.name == name && user.data().profile.mail == mail)[0]

        const unsub = onSnapshot(doc(db, "users", profile.id), (doc) => {
            this.setState({
                profile: doc.data()
            })
        });

        return profile.data()
    }
    getUserDoc = async () => {
        const users = await  this.getBripcNotesUsers()

        const user = users.filter(user => user.name == this.state.username && user.mail == this.state.userMail)[0]

        return user.id
    }

    render(){
        return (
            <BrowserRouter>
            {this.state.loading ? <LoadingDisplay/> : null}
            {this.state.notification ? <Notify text={this.state.notification}/> : null}
                <Routes>
                    <Route path="/" element={<SignUp 
                    getBripcNotesUsers={this.getBripcNotesUsers}
                    signUp={this.signUp}
                    notification={this.notification}
                    setLoadingDisplay={this.setLoadingDisplay}
                    stopLoadingDisplay={this.stopLoadingDisplay} />}></Route>

                    <Route path="/signin" element={<SignIn 
                    getBripcNotesUsers={this.getBripcNotesUsers}
                    signIn={this.signIn}
                    notification={this.notification} />}></Route>

                    <Route path="/main/*" element={<Main 
                    getProfile={this.getProfile}
                    getCookie={this.getCookie}
                    setCookie={this.setCookie}
                    getUserDoc={this.getUserDoc}
                    profile={this.state.profile}
                    notification={this.notification}
                    db={db}/>}></Route>
                </Routes>
            </BrowserRouter>
        )
    }
}