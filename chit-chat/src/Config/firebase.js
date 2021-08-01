import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/auth'

var firebaseConfig = {
  apiKey: "AIzaSyAuvdYYPV_TaQbcylGPyiJbGdyhDYti17c",
  authDomain: "chit-chat-29154.firebaseapp.com",
  projectId: "chit-chat-29154",
  storageBucket: "chit-chat-29154.appspot.com",
  messagingSenderId: "1068541060485",
  appId: "1:1068541060485:web:5840d8e994fee532b090ec"
};
  // Initialize Firebase
const Firebase = firebase.initializeApp(firebaseConfig);

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const auth = Firebase.auth();

export default Firebase;