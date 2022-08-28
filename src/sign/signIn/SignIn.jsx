import React from "react";


import Form from "./Form"
import Logo from "../../logo-border.png"
import LogoBorderBackground from "../../logo-border-background.png"

import './style.css'

export default class SignIn extends React.Component{

    state = {
        sign: 'in',
        userMail: '',
        password: ''
    }
    hadleWriting = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    signIn = async () => {

        if(!this.state.userMail || !this.state.password){
            this.props.notification("Complete all fields")
        }else{
            this.props.signIn(this.state.userMail.toLowerCase(), this.state.password)
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
                            <Form signIn={this.signIn} hadleWriting={this.hadleWriting} />
                        </section>
                    </div>
                </div>
            </section>
           </div>
        )
    }
}