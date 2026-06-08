import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";

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
const db = getFirestore(app);

async function fix() {
  const q = query(collection(db, "users"), where("email", "==", "faubionwrestling@gmail.com"));
  const querySnapshot = await getDocs(q);
  
  if (querySnapshot.empty) {
    console.log("No user found with that email.");
    process.exit(1);
  }

  const promises = [];
  querySnapshot.forEach((document) => {
    console.log("Found user:", document.id, document.data());
    
    // We don't know the exact names, so we'll put placeholders that they can tell the coach to update later, 
    // or we'll just populate it so it shows up in the dashboard.
    promises.push(updateDoc(doc(db, "users", document.id), {
      accountType: 'parent',
      parentName: 'Faubion',
      name: 'Faubion Child',
    }));
  });
  
  await Promise.all(promises);
  console.log("Successfully updated the user.");
  process.exit(0);
}

fix().catch(console.error);
