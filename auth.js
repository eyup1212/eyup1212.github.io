import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// 🔥 Firebase config (SENİN PROJE)
const firebaseConfig = {
  apiKey: "AIzaSyBSSFp-uB8XQdpCfS5jokwqkbnKBi6oXMc",
  authDomain: "etik-social.firebaseapp.com",
  projectId: "etik-social",
  storageBucket: "etik-social.firebasestorage.app",
  messagingSenderId: "358422049811",
  appId: "1:358422049811:web:dd9506109825aaed65fbe6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 🔁 Görünüm geçişleri
window.showRegister = () => {
  loginView.classList.add("hidden");
  registerView.classList.remove("hidden");
};

window.showLogin = () => {
  registerView.classList.add("hidden");
  loginView.classList.remove("hidden");
};

// 📝 REGISTER
window.register = async () => {
  const user = regUser.value.trim();
  const pass = regPass.value.trim();

  if (!user || !pass) {
    regMsg.textContent = "Boş alan bırakma";
    regMsg.className = "msg error";
    return;
  }

  // 🔑 Fake email (lokal giriş için)
  const fakeEmail = `${user}@etik.local`;

  try {
    await createUserWithEmailAndPassword(auth, fakeEmail, pass);
    regMsg.textContent = "Kayıt başarılı, giriş yapabilirsin";
    regMsg.className = "msg success";
    setTimeout(showLogin, 1000);
  } catch (e) {
    regMsg.textContent = e.message;
    regMsg.className = "msg error";
  }
};

// 🔐 LOGIN
window.login = async () => {
  const user = loginUser.value.trim();
  const pass = loginPass.value.trim();

  const fakeEmail = `${user}@etik.local`;

  try {
    await signInWithEmailAndPassword(auth, fakeEmail, pass);
    loginView.classList.add("hidden");
    homeView.classList.remove("hidden");
    welcome.textContent = `Hoş geldin ${user}`;
  } catch (e) {
    loginMsg.textContent = "Kullanıcı adı veya şifre yanlış";
    loginMsg.className = "msg error";
  }
};

// 🚪 LOGOUT
window.logout = async () => {
  await signOut(auth);
  homeView.classList.add("hidden");
  loginView.classList.remove("hidden");
};
