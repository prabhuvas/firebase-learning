import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCnMab7X5_Gz5HTbhGhEoIFsTXOBxPgCpM",
  authDomain: "complete-firebase-b119b.firebaseapp.com",
  projectId: "complete-firebase-b119b",
  storageBucket: "complete-firebase-b119b.appspot.com",
  messagingSenderId: "372035277678",
  appId: "1:372035277678:web:32d3ec29075642d9eb677f",
  measurementId: "G-BECKY3NTEV"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleprovider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);