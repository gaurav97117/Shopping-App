import { initializeApp } from 'firebase/app';
import {getAuth, signInWithRedirect, signInWithPopup,  GoogleAuthProvider,} from 'firebase/auth';

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

   const provider = new GoogleAuthProvider();
   provider.setCustomParameters({
    prompt: "select_account"
   });

   export const auth =getAuth();
   export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

   export const db = getFirestore();

   export const createUserDocumentFromAuth = async (userAuth) => {

    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot.exists());

    if (!userSnapshot.exists()) {

        const { displayName, email } = userAuth;
        const createdAt=  new Date();

        try {
            await setDoc(userDocRef,{
                displayName,
                email,
                createdAt
            });
        }
        catch (error) {
            console.log('error creating the user', error.message);
        }
    }

    return userDocRef;


   };