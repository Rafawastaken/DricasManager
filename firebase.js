// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "@firebase/storage";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDO2gGra1ZJgNNLR223jhgY330Ab5pTCno",
  authDomain: "dricasmana.firebaseapp.com",
  projectId: "dricasmana",
  storageBucket: "dricasmana.appspot.com",
  messagingSenderId: "637370957298",
  appId: "1:637370957298:web:fbe1bd30b57e3c678aff6b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
