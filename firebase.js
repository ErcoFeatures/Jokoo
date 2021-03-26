import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyB9giBXA-UWeXPvbSxHUOOpC_u6KrJ7MqM",
  authDomain: "jokoo-a02f9.firebaseapp.com",
  projectId: "jokoo-a02f9",
  storageBucket: "jokoo-a02f9.appspot.com",
  messagingSenderId: "209831871160",
  appId: "1:209831871160:web:ee5c115155dc10698c6a4d"
};

const app = !firebase.apps.length
? firebase.initializeApp(firebaseConfig)
: firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, db, provider};