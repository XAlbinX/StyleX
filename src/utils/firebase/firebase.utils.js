import {initializeApp} from "firebase/app"
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
}from "firebase/auth"
import {getFirestore, doc, getDoc,setDoc} from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDv2PPkQK4c4MG-sb77gf5uJvq4a8K4QLA",
    authDomain: "stylex-clothing-db.firebaseapp.com",
    projectId: "stylex-clothing-db",
    storageBucket: "stylex-clothing-db.appspot.com",
    messagingSenderId: "439899317085",
    appId: "1:439899317085:web:1b10feb600baa1db86feb4"
  };
  
// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt : "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth,provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {

    const userDocRef = doc(db, "users", userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    //if user does not exist
    if(!userSnapshot.exists()){

        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{    
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            })
        }catch(error){
            console.log("There was an error creating user", error.message);
        }
    }

    return userDocRef;

}

export const createAuthUserWithEmailAndPassword = async(email,password) => {

    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth,email,password);

}

export const signInAuthUserWithEmailAndPassword = async(email,password) => {

    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth,email,password);

}