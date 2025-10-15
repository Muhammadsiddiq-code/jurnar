import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

// TODO: Replace with your Firebase project configuration
// Get these values from Firebase Console > Project Settings > General > Your apps > SDK setup and configuration
const firebaseConfig = {
  apiKey: "AIzaSyDq85JkgIeUUt1jQqVLw3WgWjP1wxEDMbc",
  authDomain: "jurnal9b2025.firebaseapp.com",
  projectId: "jurnal9b2025",
  storageBucket: "jurnal9b2025.firebasestorage.app",
  messagingSenderId: "279150479775",
  appId: "1:279150479775:web:df85522070e85e4543d5aa",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firestore
export const db = getFirestore(app)

// Collection names
export const COLLECTIONS = {
  STUDENTS: "students",
  ATTENDANCE: "attendance",
}
