// auth.js
import { auth, db } from "./firebase.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

import {
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

// ELEMENTLER
const loginView = document.getElementById("loginView");
const registerView = document.getElementById("registerView");
const homeView = document.getElementById("homeView");

const loginUser = document.getElementById("loginUser");
const loginPass = document.getElementById("loginPass");
const loginMsg = document.getElementById("loginMsg");

const registerUser = document.getElementById("registerUser");
const registerPass = document.getElementById("registerPass");
const registerMsg = document.getElementById("registerMsg");

const welcome = document.getElementById("welcome");

// RANDOM EMOJI
function randomEmoji() {
  const emojis = ["😎", "🔥", "🚀", "👑", "✨", "😏", "💎"];
  return emojis[Math.floor(Math.random() * emojis.length)];
}

// REGISTER
window.register = async () => {
  const username = registerUser.value.trim();
  const pass = registerPass.value.trim();

  if (!username || !pass) {
    registerMsg.textContent = "Boş alan bırakma";
    return;
  }

  const fakeEmail = `${username}@etik.local`;

  try {
    const cred = await createUserWithEmailAndPassword(auth, fakeEmail, pass);
    const uid = cred.user.uid;

    await setDoc(doc(db, "users", uid), {
      username: username,
      uid: uid,
      emoji: randomEmoji(),
      createdAt: Date.now()
    });

    registerMsg.textContent = "Kayıt başarılı, giriş yapabilirsin";
    setTimeout(() => showLogin(), 1000);

  } catch (e) {
    registerMsg.textContent = e.message;
  }
};

// LOGIN
window.login = async () => {
  const username = loginUser.value.trim();
  const pass = loginPass.value.trim();
  const fakeEmail = `${username}@etik.local`;

  try {
    await signInWithEmailAndPassword(auth, fakeEmail, pass);
  } catch (e) {
    loginMsg.textContent = "Kullanıcı adı veya şifre yanlış";
  }
};

// LOGOUT
window.logout = async () => {
  await signOut(auth);
};

// AUTH STATE (EN KRİTİK KISIM)
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const snap = await getDoc(doc(db, "users", user.uid));

    if (!snap.exists()) {
      await signOut(auth);
      return;
    }

    const data = snap.data();
    welcome.textContent = `Hoş geldin ${data.username} ${data.emoji}`;

    loginView.classList.add("hidden");
    registerView.classList.add("hidden");
    homeView.classList.remove("hidden");

  } else {
    homeView.classList.add("hidden");
    registerView.classList.add("hidden");
    loginView.classList.remove("hidden");
  }
});

// VIEW SWITCH
window.showLogin = () => {
  registerView.classList.add("hidden");
  loginView.classList.remove("hidden");
};

window.showRegister = () => {
  loginView.classList.add("hidden");
  registerView.classList.remove("hidden");
};
