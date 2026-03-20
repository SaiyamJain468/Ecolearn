import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBaeOVOLKOsctsR2kZa0O6znsSHYGk2Le4",
  authDomain: "ecolearn-827f0.firebaseapp.com",
  projectId: "ecolearn-827f0",
  storageBucket: "ecolearn-827f0.firebasestorage.app",
  messagingSenderId: "476603770779",
  appId: "1:476603770779:web:900c56078923f7eafc633e",
  measurementId: "G-7WB72RJQ4G"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
