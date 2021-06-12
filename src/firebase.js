import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase
  .initializeApp({
    apiKey: "AIzaSyDXlkwxNcbh-8rW62J4lwCbgTHasJvE6lA",
    authDomain: "dorachat-dc5aa.firebaseapp.com",
    projectId: "dorachat-dc5aa",
    storageBucket: "dorachat-dc5aa.appspot.com",
    messagingSenderId: "414924299119",
    appId: "1:414924299119:web:6b01883109bf49de64669a",
  })
  .auth();
