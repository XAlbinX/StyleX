import { useState } from "react"

import FormInput from "../form-input/form-input.component"
import Button from "../../component/button/button.component"

import './sign-up-form.styles.scss'

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";


const defaultFormFields = {
    displayName : '',
    email : '',
    password : '',
    confirmPassword : '',
}

const SignUpForm = () => {

    const [formFields,setFormFields] = useState(defaultFormFields);
    const {displayName,email,password,confirmPassword} = formFields;


    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(password === confirmPassword){

            try {
                const {user} = await createAuthUserWithEmailAndPassword(email,password);

                await createUserDocumentFromAuth(user,{displayName});
                resetFormFields();
            } catch (error) {
                console.log(error);
            }

        }

    }

    const handleChange = (event) => {

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
                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    )

}

export default SignUpForm;