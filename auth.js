<script type="module">
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

/* 🔥 FIREBASE CONFIG */
const firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "etik-social.firebaseapp.com",
  projectId: "etik-social",
  storageBucket: "etik-social.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};

/* 🔌 INIT */
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

/* 📦 VIEWLER */
const loginView = document.getElementById("loginView");
const registerView = document.getElementById("registerView");
const homeView = document.getElementById("homeView");

const loginUser = document.getElementById("loginUser");
const loginPass = document.getElementById("loginPass");
const loginMsg = document.getElementById("loginMsg");

const regUser = document.getElementById("regUser");
const regPass = document.getElementById("regPass");
const regMsg = document.getElementById("regMsg");

const welcome = document.getElementById("welcome");

/* 👁️ VIEW GEÇİŞ */
window.showRegister = () => {
  loginView.classList.add("hidden");
  registerView.classList.remove("hidden");
};

window.showLogin = () => {
  registerView.classList.add("hidden");
  loginView.classList.remove("hidden");
};

/* 📝 REGISTER */
window.register = async () => {
  const user = regUser.value.trim();
  const pass = regPass.value.trim();

  if (!user || !pass) {
    regMsg.textContent = "Boş alan bırakma";
    regMsg.className = "msg error";
    return;
  }

  const fakeEmail = `${user}@etik.local`;

  try {
    await createUserWithEmailAndPassword(auth, fakeEmail, pass);
    regMsg.textContent = "Kayıt başarılı";
    regMsg.className = "msg success";
  } catch (e) {
    regMsg.textContent = e.message;
    regMsg.className = "msg error";
  }
};

/* 🔐 LOGIN */
window.login = async () => {
  const user = loginUser.value.trim();
  const pass = loginPass.value.trim();

  if (!user || !pass) {
    loginMsg.textContent = "Eksik bilgi";
    loginMsg.className = "msg error";
    return;
  }

  const fakeEmail = `${user}@etik.local`;

  try {
    await signInWithEmailAndPassword(auth, fakeEmail, pass);
    // ekran değişimini SADECE onAuthStateChanged yapar
  } catch (e) {
    loginMsg.textContent = "Kullanıcı adı veya şifre yanlış";
    loginMsg.className = "msg error";
  }
};

/* 🚪 LOGOUT */
window.logout = async () => {
  await signOut(auth);
};

/* 🧠 SESSION KONTROL (URL BYPASS KAPALI) */
onAuthStateChanged(auth, (user) => {
  if (user) {
    loginView.classList.add("hidden");
    registerView.classList.add("hidden");
    homeView.classList.remove("hidden");

    const username = user.email.split("@")[0];
    welcome.textContent = `Hoş geldin ${username}`;
  } else {
    homeView.classList.add("hidden");
    registerView.classList.add("hidden");
    loginView.classList.remove("hidden");
  }
});
</script>
