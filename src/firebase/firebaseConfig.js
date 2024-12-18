// src/firebase/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAkBL_ZxLpZufyboZqEILIULaZ1tBa6pZk",
  authDomain: "madlab-cc947.firebaseapp.com",
  projectId: "madlab-cc947",
  storageBucket: "madlab-cc947.firebasestorage.app",
  messagingSenderId: "412791563944",
  appId: "1:412791563944:web:6d9a575da2b9d9a3eec49d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Initialize Firestore
const auth = getAuth(app);    // Initialize Firebase Authentication

export { db, auth };
