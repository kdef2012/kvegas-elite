import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAv_d3R7MZy7AOViAlABsvjra7GrsGk9xQ",
  authDomain: "kvegas-elite.firebaseapp.com",
  projectId: "kvegas-elite",
  storageBucket: "kvegas-elite.firebasestorage.app",
  messagingSenderId: "49195959011",
  appId: "1:49195959011:web:ebf54ae6f56c0fcda7fbd6",
  measurementId: "G-VZKY5XQVZ0"
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
