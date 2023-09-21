import { useState } from "react";
import {auth, GAuth} from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
export default function Auth() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const signIn = async () => {
            await createUserWithEmailAndPassword(auth, email, password)
    }
    console.log(auth?.currentUser?.email);
    const signOutt =  () => {
         signOut(auth)
    }
    const signInWithGoogle = async () => {
        await signInWithPopup(auth, GAuth)
    }
    return (
        <div>
            <input type="text"  placeholder="Email" onChange={(e) =>setEmail(e.target.value)}/>
            <input type="password"  placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
            <button onClick={signIn}>Sign In</button>
            <button onClick={signInWithGoogle}>Sign In with Google</button>
            <button onClick={signOutt}>Sign Out</button>
        </div>
    )
}