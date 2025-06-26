// Import the functions you need from the SDKs you need
import firebase from "firebase";
import "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyDWKfpYxMXqXUQLDfjk7c3J5UxZx6_t4vQ",

  authDomain: "mzazi-5c344.firebaseapp.com",

  databaseURL: "https://mzazi-5c344-default-rtdb.firebaseio.com",

  projectId: "mzazi-5c344",

  storageBucket: "mzazi-5c344.firebasestorage.app",

  messagingSenderId: "156463252297",

  appId: "1:156463252297:web:922a5264673f78240d9098",

  measurementId: "G-MZXGGM8SZE"

};


// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = firebase.auth();

// Initialize Firebase Realtime Database
const db = firebase.database();

export { auth, db };