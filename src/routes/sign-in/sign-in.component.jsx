import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import SignUpForm from "../../component/sign-up-form/sign-up-form.component";
const SignIn = () =>{

    const logGoogleUser = async() => {
        const {user} = await signInWithGooglePopup();

        const userDocRef = await createUserDocumentFromAuth(user);
    }

    return (
        <div>
            <button onClick={logGoogleUser}>Sign in with Google</button>
            <SignUpForm/>
        </div>
    )


}

export default SignIn;