import { initializeApp } from "firebase/app";
import {
  Auth,
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  UserCredential,
} from "firebase/auth";
import {
  Firestore,
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
  DocumentReference,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDv2PPkQK4c4MG-sb77gf5uJvq4a8K4QLA",
    authDomain: "stylex-clothing-db.firebaseapp.com",
    projectId: "stylex-clothing-db",
    storageBucket: "stylex-clothing-db.appspot.com",
    messagingSenderId: "439899317085",
    appId: "1:439899317085:web:1b10feb600baa1db86feb4"
  };

const firebaseapp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const auth: Auth = getAuth();
export const signInWithGooglePopup = (): Promise<UserCredential> => signInWithPopup(auth, provider);

export const db: Firestore = getFirestore();

export const getCategoriesAndDocuments = async (): Promise<Record<string, any>> => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {} as Record<string, any>);

  return categoryMap;
}

export const createUserDocumentFromAuth = async (
  userAuth: any, // You might want to replace 'any' with a more specific type
  additionalInformation: Record<string, any> = {}
): Promise<DocumentReference> => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      });
    } catch (error) {
        if (error instanceof Error) {
            console.log("There was an error creating user", error.message);
        } else {
            console.log("There was an error creating user", error);
        }
    }
  }

  return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email: string, password: string): Promise<UserCredential | void> => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email: string, password: string): Promise<UserCredential | void> => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async (): Promise<void> => await signOut(auth);

export const onAuthStateChangedListener = (callback: (user: any) => void) => onAuthStateChanged(auth, callback);
