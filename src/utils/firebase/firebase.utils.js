

import { initializeApp } from 'firebase/app';
import {getAuth, signInWithRedirect, signInWithPopup,  GoogleAuthProvider,createUserWithEmailAndPassword} from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc, } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAALGv3W9_4JIW3ApszQt8g72Tj9rQkAeQ",
    authDomain: "crwn-clothing-db-51510.firebaseapp.com",
    projectId: "crwn-clothing-db-51510",
    storageBucket: "crwn-clothing-db-51510.appspot.com",
    messagingSenderId: "76884546015",
    appId: "1:76884546015:web:b07a3f497cc6687330b46a"
  };
  
 
  const firebaseapp = initializeApp(firebaseConfig);

   const googleprovider = new GoogleAuthProvider();
   googleprovider.setCustomParameters({
    prompt: "select_account"
   });

   export const auth =getAuth();
   export const signInWithGooglePopup = () => signInWithPopup(auth, googleprovider);
   export const signInWithGoogleRedirect =() => signInWithRedirect(auth,googleprovider);

   export const db = getFirestore();

   export const createUserDocumentFromAuth = async (userAuth, additionalInformation= {}) => {

    if(!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);


    const userSnapshot = await getDoc(userDocRef);
    

    if (!userSnapshot.exists()) {

        const { displayName, email } = userAuth;
        const createdAt=  new Date();

        try {
            await setDoc(userDocRef,{
                displayName,
                email,
                createdAt,

                ...additionalInformation,
            });
        }
        catch (error) {
            console.log('error creating the user', error.message);
        }
    }

    return userDocRef;


   };
   
   export const  createAuthUserWithEmailAndPassword = async (email, password) => {

    if(!email|| !password) return;

    return await createUserWithEmailAndPassword(auth, email, password)

   }