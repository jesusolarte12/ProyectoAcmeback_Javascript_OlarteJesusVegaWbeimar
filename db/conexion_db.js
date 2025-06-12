// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDUyd7pGSBpa5l-jIh_jey8lyy_nHuwC6M",
  authDomain: "base-de-datos-4c0a6.firebaseapp.com",
  projectId: "base-de-datos-4c0a6",
  storageBucket: "base-de-datos-4c0a6.firebasestorage.app",
  messagingSenderId: "618055385281",
  appId: "1:618055385281:web:110d5560ac72706f799440",
  measurementId: "G-SDZ0ZRLFQP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export {analytics}