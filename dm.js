import { auth, db } from "./firebase.js";
import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const userDiv = document.getElementById("user");
const msgInput = document.getElementById("msg");
const sendBtn = document.getElementById("send");
const messages = document.getElementById("messages");

let currentUser = null;

// 🔐 AUTH KONTROLÜ
onAuthStateChanged(auth, user => {
  if (!user) {
    location.href = "index.html";
  } else {
    currentUser = user;
    userDiv.innerText = "Giriş yapan: " + user.email;
    loadMessages();
  }
});

// 📩 MESAJ GÖNDER
sendBtn.onclick = async () => {
  if (!msgInput.value.trim()) return;

  await addDoc(collection(db, "messages"), {
    text: msgInput.value,
    uid: currentUser.uid,
    email: currentUser.email,
    createdAt: serverTimestamp()
  });

  msgInput.value = "";
};

// 📥 MESAJLARI ÇEK
function loadMessages() {
  const q = query(
    collection(db, "messages"),
    orderBy("createdAt")
  );

  onSnapshot(q, snap => {
    messages.innerHTML = "";
    snap.forEach(doc => {
      const li = document.createElement("li");
      li.innerText = doc.data().email + ": " + doc.data().text;
      messages.appendChild(li);
    });
  });
}
