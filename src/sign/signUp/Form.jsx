import React, {useState} from "react";

import './formStyle.css'

import Checkbox from "../../components/Checkbox";

export default function Form (props) {

    const [showPass, setShowPass] = useState(false)

    return (
        <form onSubmit={(e) => e.preventDefault()} className="signForm">
            <section>
                <input name="userName" onChange={(e) => {props.hadleWriting(e)}} type="text" placeholder="Your name"/>
            </section>
            <section>
                <input required name="userMail" onChange={(e) => {props.hadleWriting(e)}} type="mail" placeholder="Your mail"/>
            </section>
            <section>
                <input name="password" onChange={(e) => {props.hadleWriting(e)}} type={showPass ? "text" : "password"} placeholder="Password"/>

                <Checkbox style={{
                    marginTop: '20px',
                    marginRight: '10px',
                    display: 'inline-flex',
                    itemAlign: "center"
                }} check="show" checked={showPass} callback={() => setShowPass(!showPass)}/>

                Show password
            </section>
            <button className="signSubmitButton" onClick={() => {props.signUp()}}>Join to Bripc</button>
        </form>
    )
}