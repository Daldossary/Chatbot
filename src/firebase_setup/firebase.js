// Import the functions you need from the SDKs you need
import firebase from 'firebase';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFpfWSvRRRIwnFModSr_drLaa1HN8484U",
  authDomain: "react-chatbot-8df8b.firebaseapp.com",
  projectId: "react-chatbot-8df8b",
  storageBucket: "react-chatbot-8df8b.appspot.com",
  messagingSenderId: "227550114134",
  appId: "1:227550114134:web:d18e1e6c690bb939e8a6f7"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
 
export default db;