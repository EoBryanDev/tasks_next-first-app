import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDqFQ4bXV3S1DvcnQHZUhLrOdWoBSzKYuo",
  authDomain: "tasksplus-172b9.firebaseapp.com",
  projectId: "tasksplus-172b9",
  storageBucket: "tasksplus-172b9.appspot.com",
  messagingSenderId: "261992752440",
  appId: "1:261992752440:web:5c5e51a20462825f22cdcd",
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

export { db };
