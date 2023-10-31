import { useState, FormEvent, ChangeEvent} from "react"
import { Navigate, useNavigate } from "react-router-dom"

import FormInput from "../form-input/form-input.component"
import Button from "../button/button.component"

import './sign-in-form.styles.scss'

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth, signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";



const defaultFormFields = {
    email : '',
    password : '',
}

const SignInForm = () => {

    const  navigate = useNavigate();
    const [formFields,setFormFields] = useState(defaultFormFields);
    const {email,password} = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async() => {
       await signInWithGooglePopup();
       navigate("/")
    }

    const handleSubmit = async (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault();

            try {
                await signInAuthUserWithEmailAndPassword(email,password);
                navigate("/")
            } catch (error) {
                console.log(error);
            }

    }

    const handleChange = (event : ChangeEvent<HTMLInputElement>) => {

        const {name , value} = event.target;

        setFormFields({...formFields, [name]: value })
        
    }

    return (

        <div className="sign-in-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>

                <FormInput label = "Email" type={"email"} onChange = {handleChange} name = "email" value = {email} required/>
                <FormInput label = "Password" type={"password"} onChange = {handleChange} name = "password" value = {password} required/>
                <div className="buttons-container">
                <Button buttonType="inverted">Sign In</Button>
                <Button buttonType="google" onClick={signInWithGoogle}>Google sign in</Button>
                </div>
                
            </form>
        </div>
    )

}

export default SignInForm;