import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "",
  authDomain: "mydb-f664c.firebaseapp.com",
  projectId: "mydb-f664c",
  storageBucket: "mydb-f664c.appspot.com",
  messagingSenderId: "8307885884",
  appId: "1:8307885884:web:e426f8e458f94093c30039",
  measurementId: "G-TENSE23MDP",
  databaseURL: "https://mydb-f664c-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// Initialize Firebase
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

// Initialize Firebase services
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
const database = getDatabase(app);

export { auth, firestore, storage, database, sendPasswordResetEmail };
