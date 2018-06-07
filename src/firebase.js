import Firebase from 'firebase'

const firebaseApp = Firebase.initializeApp({

    apiKey: "AIzaSyBFC_RK0bdQtSmMmh1GUwJKdRQaTmq0KSo",
    authDomain: "rebelionapp.firebaseapp.com",
    databaseURL: "https://rebelionapp.firebaseio.com",
    projectId: "rebelionapp",
    storageBucket: "",
    messagingSenderId: "549341487903"

});
export const db = firebaseApp.database();