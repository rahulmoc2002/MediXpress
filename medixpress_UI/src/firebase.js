// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyDy9y-8IYxuDdAFx7ANemBqqkM9qOSBONU",
    authDomain: "medixpress-19807.firebaseapp.com",
    projectId: "medixpress-19807",
    storageBucket: "medixpress-19807.appspot.com",
    messagingSenderId: "261781321146",
    appId: "1:261781321146:web:e51f75b06044c3291c9983",
    measurementId: "G-0MLDES89MC"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
