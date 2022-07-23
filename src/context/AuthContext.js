import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
export const AuthContext = React.createContext();
// children is an inbuilt prop -> it refers to all the component specified inside 
export function AuthContextProvider({ children }) {
    let [mainLoader, setMainLoader] = useState(true);
    let [cUser, setUser] = useState(null);
    useEffect(() => {
        // / /event listener
        let unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                setUser(user);
                // ...
            } else {
                // User is signed out
                // ...
                setUser(null);
            }

            setMainLoader(false);

            return unsubscribe;
        });
        return unsubscribe;
    }, []);
    let value = cUser
    return (
        <AuthContext.Provider value={value}>
            {mainLoader == false && children}
        </ AuthContext.Provider>
    )
}



// 1. event listener added
//  2. it will return a function that is used to remove the listener
// function onAuthStateChanged() {
//     //
//     //
//     //
//     // dmfb dfnb f  mdnf
//     return function unsubscribe() {
//         // call
//     }

// }

//onAuthStateChanged(auth, (user) => {
//Call whenever Login/logout occur
//This help in reload, if user already present -> show user and setUser to user
//Without this form will appear evertime while reload
//Check user is logged in or not
// if (user) {
//     // User is signed in, see docs for a list of available properties
//     // https://firebase.google.com/docs/reference/js/firebase.User
//     setUser(user);
//     // ...
//     } else {
//     // User is signed out
//     setUser(null);
//     }
//     setMainLoader(false); //To hide login page while reloading
// });