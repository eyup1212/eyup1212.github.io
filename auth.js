import { auth, db } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

import {
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

// ELEMENTLER
const loginView = document.getElementById("loginView");
const registerView = document.getElementById("registerView");
const homeView = document.getElementById("homeView");
const welcome = document.getElementById("welcome");

// GLOBAL
window.showRegister = () => {
  loginView.classList.add("hidden");
  registerView.classList.remove("hidden");
};

window.showLogin = () => {
  registerView.classList.add("hidden");
  loginView.classList.remove("hidden");
};

// REGISTER
window.register = async () => {
  const username = regUser.value;
  const password = regPass.value;
  const emoji = regEmoji.value || "🙂";

  if (!username || !password) {
    regMsg.innerHTML = "<span class='error'>Eksik bilgi</span>";
    return;
  }

  const fakeEmail = username + "@etik.local";

  try {
    const userCred = await createUserWithEmailAndPassword(
      auth,
      fakeEmail,
      password
    );

    await setDoc(doc(db, "users", userCred.user.uid), {
      username,
      emoji
    });

    regMsg.innerHTML = "<span class='success'>Kayıt başarılı</span>";
  } catch (e) {
    regMsg.innerHTML = "<span class='error'>" + e.message + "</span>";
  }
};

// LOGIN
window.login = async () => {
  const username = loginUser.value;
  const password = loginPass.value;

  const fakeEmail = username + "@etik.local";

  try {
    await signInWithEmailAndPassword(auth, fakeEmail, password);
  } catch (e) {
    loginMsg.innerHTML = "<span class='error'>Hatalı giriş</span>";
  }
};

// AUTH STATE
onAuthStateChanged(auth, (user) => {
  if (user) {
    loginView.classList.add("hidden");
    registerView.classList.add("hidden");
    homeView.classList.remove("hidden");
    welcome.innerText = "Hoş geldin " + user.email.split("@")[0];
  }
});

// LOGOUT
window.logout = async () => {
  await signOut(auth);
  location.reload();
};
