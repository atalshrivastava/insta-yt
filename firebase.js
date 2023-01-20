import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1ykMf2l3sNElVrLWMqtoK1PaVn-GOTII",
  authDomain: "insta-yt-2aff6.firebaseapp.com",
  projectId: "insta-yt-2aff6",
  storageBucket: "insta-yt-2aff6.appspot.com",
  messagingSenderId: "9827572060",
  appId: "1:9827572060:web:ea078f201b06fab2c14999"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore()
const storage = getStorage()

export {app, db, storage}