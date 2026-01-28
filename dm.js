import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  // KENDİ CONFIG'İN
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let currentUser;
let chatId;

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "index.html";
  } else {
    currentUser = user;
  }
});

document.getElementById("sendBtn").onclick = async () => {
  const receiverUid = document.getElementById("receiverUid").value;
  const text = document.getElementById("messageInput").value;

  if (!receiverUid || !text) return;

  chatId = [currentUser.uid, receiverUid].sort().join("_");

  await addDoc(
    collection(db, "chats", chatId, "messages"),
    {
      senderId: currentUser.uid,
      text,
      createdAt: serverTimestamp()
    }
  );

  document.getElementById("messageInput").value = "";
  listenMessages();
};

function listenMessages() {
  const q = query(
    collection(db, "chats", chatId, "messages"),
    orderBy("createdAt")
  );

  onSnapshot(q, (snapshot) => {
    const box = document.getElementById("messages");
    box.innerHTML = "";
    snapshot.forEach((doc) => {
      const msg = doc.data();
      box.innerHTML += `<p><b>${msg.senderId}</b>: ${msg.text}</p>`;
    });
  });
}
