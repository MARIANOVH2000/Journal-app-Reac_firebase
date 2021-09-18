
//para firebase 9 en adelante
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyBe0MUft-SCDL1mdzg-hMYQYcJpZlAjxrk",
    authDomain: "react-app-cursos-789ba.firebaseapp.com",
    projectId: "react-app-cursos-789ba",
    storageBucket: "react-app-cursos-789ba.appspot.com",
    messagingSenderId: "616098251333",
    appId: "1:616098251333:web:f9396b0dc2702a303c592c"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export { db, googleAuthProvider, firebase };
