// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCvifCT05JKFXBR2zaJZWIugUiFOGZAUts",
    authDomain: "c1123g1-cs6.firebaseapp.com",
    projectId: "c1123g1-cs6",
    storageBucket: "c1123g1-cs6.appspot.com",
    messagingSenderId: "337696004780",
    appId: "1:337696004780:web:781c565cd7fe140d9c5d09",
    measurementId: "G-7LPY3WR6HQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);