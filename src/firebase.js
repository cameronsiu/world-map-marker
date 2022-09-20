import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { 
    getAuth
} from "firebase/auth";


// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyDSlU6o3Z8vi0JNAlMIrmXJExedE0MOuc4",
    authDomain: "world-map-marker.firebaseapp.com",
    projectId: "world-map-marker",
    storageBucket: "world-map-marker.appspot.com",
    messagingSenderId: "82466329721",
    appId: "1:82466329721:web:9a2b6c6ee719f0ae6330a8",
    measurementId: "G-0KMTXWC6CN"
};

const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };



