
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyA6lae92dxDNikgvagV_oaEmn4WSbNtIc4",
  authDomain: "reactjscomision34860.firebaseapp.com",
  projectId: "reactjscomision34860",
  storageBucket: "reactjscomision34860.appspot.com",
  messagingSenderId: "956757419280",
  appId: "1:956757419280:web:24fad1898d16be5f173195",
  measurementId: "G-GHTK78QR4S"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)