import React from "react";


import Form from "./Form"
import Logo from "../../logo-border.png"
import LogoBorderBackground from "../../logo-border-background.png"

import './style.css'

export default class SignUp extends React.Component{

    state = {
        sign: 'up',
        userName: '',
        userMail: '',
        password: ''
    }
    hadleWriting = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    signUp = async () => {

        if(this.state.userMail && this.state.userName && this.state.password){
            this.props.setLoadingDisplay()

            this.checkSignUp(this.state.userName.toLowerCase(), this.state.userMail.toLowerCase())
                .then(result => {
                    this.props.stopLoadingDisplay()
        
                    if(result === true){
                        this.props.signUp(this.state.userName, this.state.userMail, this.state.password)
                        
                    }else if(result == 1){
                        this.props.notification("This user name is already in use")
                        
                    }else if(result == 2){
                        this.props.notification("This user mail is already in use")
                    }
            })
        }else{
            this.props.notification("Complete all fields")
        }
        
    }
    checkSignUp = async (userName, userMail) => {
        const users = await this.props.getBripcNotesUsers()

        userName = userName.trim()
        userMail = userMail.trim().toLowerCase()

        if(users.length < 1){
            return true
        }

        const userNameFound = users.filter(user => user.data().profile.name.trim() == userName).length > 0
        const userMailFound = users.filter(user => user.data().profile.mail.trim().toLowerCase() == userMail).length > 0

        if(userNameFound){
            return 1

        }else if(userMailFound){                
            return 2

        }else{
            return true
        }
    }

    render(){
        return (
           <div className="sign">
           <div className="sign-superior-bar">
               <img src={LogoBorderBackground}/>
           </div>
            <section>
                <div  className="sign-logo-section">
                    <div>
                        <img src={Logo} />
                        <h1>Bripc Notes</h1>                        
                    </div>
                </div>
                <div className="sign-form-section">
                    <div>
                        <h1>
                            <span 
                            onClick={() => window.location = '/'}
                            style={this.state.sign == 'up' ? {color: 'black'} : {color: '#0000002e'}}>Sign up</span>

                            /

                            <span 
                            onClick={() => window.location = '/signin'}
                            style={this.state.sign == 'up' ? {color: '#0000002e'} : {color: 'black'}}>Log in</span>
                        </h1>
                        <section>
                            <h1>We will need...</h1>
                            <Form signUp={this.signUp} hadleWriting={this.hadleWriting} />
                        </section>
                    </div>
                </div>
            </section>
           </div>
        )
    }
}