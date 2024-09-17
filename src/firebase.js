// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {toast} from 'react-toastify'
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getFirestore, addDoc, collection, limitToLast } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwGqM2MO9gavw8Sd1CMgeaW48Slp-ZAR4",
  authDomain: "netflix-clone-787c1.firebaseapp.com",
  projectId: "netflix-clone-787c1",
  storageBucket: "netflix-clone-787c1.appspot.com",
  messagingSenderId: "575027880739",
  appId: "1:575027880739:web:c5b3b30a58e3298a1de296",
  measurementId: "G-FKY0X0RW84",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(
      collection(db, "user"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
      });
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "))
  }
};

const login = async (email, password) => {
    // Basic validation for email and password
    if (!email || !password) {
      toast.error("Please provide both email and password.");
      return;
    }
  
    try {
      // Attempt to sign in the user
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful");
      // You could redirect or perform other actions upon successful login
    } catch (error) {
      // Firebase Authentication error handling
      switch (error.code) {
        case 'auth/user-not-found':
          toast.error("User not found. Please check your email or sign up.")
          break;
        case 'auth/wrong-password':
          toast.error("Incorrect password. Please try again.");
          break;
        case 'auth/invalid-email':
          toast.error("Invalid email format.");
          break;
        default:
          toast.error("Error: " + error.message);
      }
      console.error(error);  // Log full error for debugging purposes
    }
  };
  
const logout =()=>{
    signOut(auth);
}

export {auth, db, login , signup, logout};