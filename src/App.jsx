import { collection, getDocs, addDoc, onSnapshot, doc } from "firebase/firestore"
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage"
import React from "react"

import {BrowserRouter, Routes, Route } from 'react-router-dom'

//Data bases
import db from "./databases/db_bripcNotes"
import db_storage from "./databases/db_storage"

import SignUp from "./sign/signUp/SignUp"
import SignIn from "./sign/signIn/SignIn"
import Notify from "./components/Notify"
import LoadingDisplay from "./components/LoadingDisplay"
import Main from "./main/Main"
import UnFocusMainDisplay from "./main/UnFocusMainDisplay"

import './styles/app.css'
import AdvertNotification from "./components/AdvertNotification"

export default class App extends React.Component{

    state = {
        notification: false,
        advertNotification: false,
        loading: false,
        user: this.getUserCookie,
        profile: {},
        isInMobileScreen: false,
        openUnFocusMainDisplay: false
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
                    title: "Welcome",
                    owner: mail,
                    shareWith: []
                }],

                tags: [
                    'welcome'
                ]
            },
            profile: {
                mail: mail,
                name: name,
                pass: pass,
                friends: []
            }
        }
        const newDocAddedId = await addDoc(collection(db, 'users'), newDoc)
        
        this.saveUser(name, mail.trim())

        this.createNewFirebaseFoldStorage(newDocAddedId.id)

        window.location = "/main"
    }

    signIn = async (userMail, pass) => {

        const userMailLower = userMail.trim().toLowerCase()

        this.setState({
            loading: true
        })

        this.getBripcNotesUsers().then(result => {

            this.setState({
                loading: false
            })

            const users = result

            let login = users.filter(user => user.data().profile.mail.toLowerCase() == userMailLower && user.data().profile.pass == pass).length == 1

            if(login){
                let userName = users.filter(user => user.data().profile.mail.toLowerCase() == userMailLower && user.data().profile.pass == pass)[0].data().profile.name

                this.saveUser(userName, userMail.trim())

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

    advertNotification = (title, content) => {
        this.setState({
            advertNotification: {title:title, content:content}
        })
    }

    closeAdvertNotification = () => {
        this.setState({
            advertNotification: false
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

        const userName = this.getCookie('userName')
        const userMail = this.getCookie('userMail')

        const user = users.filter(user => user.data().profile.name == userName && user.data().profile.mail == userMail)[0]

        console.log("DOC: " + users)
        
        //return user.doc

    }

    setBodyClick = (click) => {
        document.onclick = () => {
            click()
            return false
        }
    }

    createNewFirebaseFoldStorage = async (userId) => {
        const storageRef = ref(db_storage, "users")
    }

    uploadNoteImage = async (url, image, name) => {

        const storageRef = ref(db_storage, url + name)

        console.log(storageRef)

        uploadBytes(storageRef, image).then(() => {
            console.log("imagen subida")
        })
    }

    getUserImageURL = async (user, folder, imageName) => {
        const storageRef = ref(db_storage, `users/${user}/${folder}/${imageName}`)

        getDownloadURL(storageRef).then(imgURL => {
            return imgURL

        }).catch(error => {
            console.log(error)
        })
    }

    getStorageFile = async (reference) => {
        let url = ""
        
        await getDownloadURL(reference).then(fileURL => {
            url = fileURL
        })

        return url
    }

    getUserFiles = async (user, folder) => {
        const listRef = ref(db_storage, `users/${user}/${folder}`)
        let fileList = []

        await listAll(listRef).then(list => {
            fileList =  list
        })

        return fileList
    }
    

    componentDidMount(){

        let checkDataBaseNotification = async () => {
            const notifications = await getDocs(collection(db, "notifications"))

            if(notifications.length){

                this.setState({
                    openUnFocusMainDisplay: () => {
                        this.setState({
                            advertNotification :false,
                            openUnFocusMainDisplay: false
                        })
                    }
                })
                this.advertNotification(notifications.docs[0].data().title, notifications.docs[0].data().content)
            }
        }

        checkDataBaseNotification()

        document.oncontextmenu = () => {return false}

        this.setState({
            isInMobileScreen: window.outerWidth <= 780 ? true : false
        })
    }

    render(){

        return (
            <BrowserRouter>
            {this.state.openUnFocusMainDisplay ? <UnFocusMainDisplay click={this.state.openUnFocusMainDisplay} /> : null}
            {this.state.loading ? <LoadingDisplay/> : null}
            {this.state.advertNotification ? <AdvertNotification title={this.state.advertNotification.title} content={this.state.advertNotification.content}/> : null}
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
                    getStorageFile={this.getStorageFile}
                    getUserFiles={this.getUserFiles}
                    getUserImageURL={this.getUserImageURL}
                    uploadNoteImage={this.uploadNoteImage}
                    getProfile={this.getProfile}
                    getCookie={this.getCookie}
                    setCookie={this.setCookie}
                    getUserDoc={this.getUserDoc}
                    profile={this.state.profile}
                    notification={this.notification}
                    db={db}
                    setLoadingDisplay={this.setLoadingDisplay}
                    stopLoadingDisplay={this.stopLoadingDisplay}
                    setBodyClick={this.setBodyClick}
                    isInMobileScreen={this.state.isInMobileScreen} />}></Route>
                </Routes>
            </BrowserRouter>
        )
    }
}
