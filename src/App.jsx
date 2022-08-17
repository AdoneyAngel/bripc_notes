import { collection, getDocs, addDoc } from "firebase/firestore"
import React from "react"

import {BrowserRouter, Routes, Route } from 'react-router-dom'

import SignUp from "./sign/signUp/SignUp"
import SignIn from "./sign/signIn/SignIn"
import db from "./databases/db_bripcNotes"
import Notify from "./components/Notify"
import LoadingDisplay from "./components/LoadingDisplay"

import './styles/app.css'

export default class App extends React.Component{

    state = {
        notification: false,
        loading: false
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

    signUp = async (name, mail, pass) => {
        const newDoc = {
            'notes': {
                notes: {
                    content: "welcome to Bripc Notes",
                    done: false,
                    task: false,
                    tag: "welcome"
                },
                tags: [
                    'welcome'
                ]
            },
            'profile': {
                mail: mail,
                name: name,
                pass: pass
            }
        }
        addDoc(collection(db, 'users'), newDoc)

        console.log("Se ha creado la cuenta")
    }

    signIn = async (userMail, pass) => {

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
                console.log('Se ha iniciado sesion')
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
                </Routes>
            </BrowserRouter>
        )
    }
}