import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDcwwKy7dMiTJlm6MRq-pbU63ix4BrbtTo",
  authDomain: "devs-a4514.firebaseapp.com",
  projectId: "devs-a4514",
  storageBucket: "devs-a4514.appspot.com",
  messagingSenderId: "653104296402",
  appId: "1:653104296402:web:dcc40b08df817fb872180b",
  measurementId: "G-PNQJS79KVF"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);