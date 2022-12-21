import { useState,FormEvent,ChangeEvent } from "react"

import FormInput from "../form-input/form-input.component"
import Button from "../button/button.component"

import './sign-up-form.styles.scss'

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import { useNavigate } from "react-router-dom";
import { User, UserCredential } from "firebase/auth";


const defaultFormFields = {
    displayName : '',
    email : '',
    password : '',
    confirmPassword : '',
}

const SignUpForm = () => {

    const navigate = useNavigate()
    const [formFields,setFormFields] = useState(defaultFormFields);
    const {displayName,email,password,confirmPassword} = formFields;


    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if(password === confirmPassword){

            try {
                const userData = await createAuthUserWithEmailAndPassword(email,password);

                await createUserDocumentFromAuth(userData?.user,{displayName});
                resetFormFields();
                navigate("/")
            } catch (error) {
                console.log(error);
            }

        }

    }

    const handleChange = (event : ChangeEvent<HTMLInputElement>) => {

        const {name , value} = event.target;

        setFormFields({...formFields, [name]: value })
        
    }

    return (

        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>

                <FormInput label = "Display Name" type={"text"} onChange = {handleChange} name = "displayName" value = {displayName} required/>

                <FormInput label = "Email" type={"email"} onChange = {handleChange} name = "email" value = {email} required/>

                <FormInput label = "Password" type={"password"} onChange = {handleChange} name = "password" value = {password} required/>

                <FormInput label = "Confirm Password" type={"password"} onChange = {handleChange} name = "confirmPassword" value = {confirmPassword} required/>
                <Button type="submit" buttonType>Sign Up</Button>
            </form>
        </div>
    )

}

export default SignUpForm;