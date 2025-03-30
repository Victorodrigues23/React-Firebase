import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBn81OHt0Ky_vPEIgKhfUTcYIUKMRg4bXI",
  authDomain: "curso-b420f.firebaseapp.com",
  projectId: "curso-b420f",
  storageBucket: "curso-b420f.firebasestorage.app",
  messagingSenderId: "419123382871",
  appId: "1:419123382871:web:641bf5c75a6527e9cef112",
  measurementId: "G-8TERX872JK",
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

export { db };
