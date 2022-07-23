import React, { useEffect, useState } from 'react';
import { auth } from "../firebase";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

function Login() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [user, setUser] = useState(null);
  let [loader, setLoader] = useState(false);
  let [error, setError] = useState("");
  let [mainLoader, setMainLoader] = useState(true);

  const trackEmail = (e) => {
    setEmail(e.target.value);
  }

  const trackPassword = (e) => {
    setPassword(e.target.value);
  }

  const printDetails = async function () {
    // alert(email + " " + password);
    try {
      setLoader(true);
      let userCred =  await signInWithEmailAndPassword(auth, email, password);
      setUser(userCred.user);
    } catch(err) {
      setError(err.message);
      //After some time -> remove error message
      setTimeout( () => {
        setError("")
      },2000)
    }
    setLoader(false);
  }

  const signout = async function() {
    await signOut(auth);
    setUser(null);
  }

  useEffect(() => {
    
    onAuthStateChanged(auth, (user) => {
      //Call whenever Login/logout occur
      //This help in reload, if user already present -> show user and setUser to user
      //Without this form will appear evertime while reload
      //Check user is logged in or not
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUser(user);
        // ...
      } else {
        // User is signed out
        setUser(null);
      }
      setMainLoader(false); //To hide login page while reloading
    });
  }, []); //EMPTY ARRAY run once in lifetime

  return (
    <>
      { 
        error != "" ? <h1>Error is {error}</h1> : 
        loader == true ? <h1>Loading...</h1> : 
        user != null ?
        <>
          <button onClick={signout}>Signout</button> 
          <h1> user is {user.uid} </h1> 
        </> :  
        
        <>
          <input type="email" onChange = {trackEmail} value={email} placeholder='email'></input>
          <br></br> {/*use for break*/}
          <input type="password" onChange = {trackPassword} value={password} placeholder='password'></input>
          <br></br>
          <button type="submit" onClick = {printDetails}>Login</button>
        </> /*if user found then show user details else show form */
      } 
    </>
  )
}

export default Login  