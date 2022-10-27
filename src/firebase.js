// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLHvET6OlQ6UxFXoNchuZ9OMQGkZD_k-Y",
  authDomain: "tradein-app-6a0bd.firebaseapp.com",
  databaseURL: "https://tradein-app-6a0bd-default-rtdb.firebaseio.com",
  projectId: "tradein-app-6a0bd",
  storageBucket: "tradein-app-6a0bd.appspot.com",
  messagingSenderId: "989754830520",
  appId: "1:989754830520:web:95b3c6ba7a8c5fb7564e4d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage(app);

const db = getFirestore(app);
export { db }
