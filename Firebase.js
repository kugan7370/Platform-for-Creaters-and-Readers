
import { initializeApp } from "firebase/app";

import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDnhivn3U2DhWpqOQwEGvmt-rTS-haoVe8",
    authDomain: "mini-project-1-8951f.firebaseapp.com",
    projectId: "mini-project-1-8951f",
    storageBucket: "mini-project-1-8951f.appspot.com",
    messagingSenderId: "377269655308",
    appId: "1:377269655308:web:2c70c84ba1f07859a09b29",
    measurementId: "G-NFMP2MMPSF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage();
const db = getFirestore(app);
const auth = getAuth(app);


export { db, auth, storage };