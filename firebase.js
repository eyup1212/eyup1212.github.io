// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBSSFp-uBSSFp-uBSSFp-u",
  authDomain: "etik-social.firebaseapp.com",
  projectId: "etik-social",
  storageBucket: "etik-social.appspot.com",
  messagingSenderId: "358422049811",
  appId: "1:358422049811:web:dd9506109825aaed65fbe6"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
