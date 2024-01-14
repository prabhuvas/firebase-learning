import React, { useState } from 'react'
import { auth, googleprovider } from "../config/firebase";
import { createUserWithEmailAndPassword, signOut, signInWithPopup } from "firebase/auth";

export const Auth = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signIn = async () => {
        try {
            await createUserWithEmailAndPassword(auth ,email, password);
        } catch(err) {
            console.error(err);
        }
    }
    //console.log(auth?.currentUser?.email);

    const logOut = async () => {
        try {
            await signOut(auth);
        } catch(err) {
            console.error(err);
        }
    }

    const signInWithGoogle = async () => {
        // try {
        //     await signInWithPopup(auth, googleprovider);
        // } catch(err){
        //     console.error(err);
        // }
        await signInWithPopup(auth, googleprovider);
    }

  return (
    <div>
        <input type="email" placeholder='Email...' onChange={(event) => {setEmail(event.target.value)}} />
        <input type="password" placeholder='Password...' onChange={(event) => {setPassword(event.target.value)}} />
        <button  onClick={signIn}>Sign In</button>
        <button onClick={logOut}>Sign Out</button>
        <br />
        <button onClick={signInWithGoogle}>Sign In With Google</button>
    </div>
  )
}
