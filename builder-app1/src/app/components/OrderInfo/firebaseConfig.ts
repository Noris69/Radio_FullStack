// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJoQnbdQifdNMsq5fXWx9d9JE6KxcwLwg",
  authDomain: "ynovapi-43204.firebaseapp.com",
  databaseURL: "https://ynovapi-43204-default-rtdb.firebaseio.com",
  projectId: "ynovapi-43204",
  storageBucket: "ynovapi-43204.appspot.com",
  messagingSenderId: "675485531833",
  appId: "1:675485531833:web:0a5103f94d3e75eb11a568",
  measurementId: "G-VE5SGZRWBY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Optionally initialize Analytics
let analytics;
if (typeof window !== 'undefined' && window.navigator) {
  analytics = getAnalytics(app);
}

// Initialize Storage
const storage = getStorage(app);

// Export the initialized services
export { storage, analytics };
