import React, { useState } from "react"
import MapChart from "./component/MapChart";
import { auth, db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "firebase/auth";

// TODO: Make save button look good
// TODO: Add authentication and login / register page
// TODO: Zooming out more
// TODO: add menu bar (visited countries at bottom)
// TODO: Make loading screen nice
// TODO: remove scroll bar

function App() {
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [user, setUser] = useState({})

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    })

    const register = async () => {
        try {
            const res = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
            const user = res.user;
            await addDoc(collection(db, "users"), {
            uid: user.uid,
            authProvider: "local",
            registerEmail,
            });
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    }

    const login = async () => {
        try {
            await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    }
    const logout = async () => {
        await signOut(auth);
    }

  return (
    <div>
        <div>
            <h3> Register User</h3>
            <input 
            placeholder="Email..."
            onChange={(event) => {
                setRegisterEmail(event.target.value);
            }}
            />
            <input 
            placeholder="Password..." 
            onChange={(event) => {
                setRegisterPassword(event.target.value);
            }}/>
            <button onClick={register}>Create User</button>
        </div>
        <div>
            <h3>Login</h3>
            <input 
            placeholder="Email..."
            onChange={(event) => {
                setLoginEmail(event.target.value);
            }}
            />
            <input 
            placeholder="Password..." 
            onChange={(event) => {
                setLoginPassword(event.target.value);
            }}/>
            <button onClick={login}> Login </button>
        </div>

        <h4> User Logged In: </h4>
        {user?.email}

        <button onClick={logout}> Sign Out </button>
    </div>
  )
}

export default App;
