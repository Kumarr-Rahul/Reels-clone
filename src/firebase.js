//npm i firebase
//src -> create firebase.js
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import secret from "./secrets";

let app = initializeApp(secret);
//from above lines we able to include firebase in react app
export let auth = getAuth(app);