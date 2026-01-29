// AUTO LOGIN
let uid = localStorage.getItem("uid");
if (uid) {
  document.getElementById("login").style.display = "none";
  document.getElementById("app").style.display = "block";

  document.getElementById("link").value =
    location.origin + "/send.html?to=" + uid;

  loadMessages();
  receiveMessages();
}

// LOGIN (ilk defa)
function login() {
  let name = document.getElementById("name").value;
  if (!name) return;

  let id = Math.random().toString(36).slice(2);
  localStorage.setItem("uid", id);
  localStorage.setItem("messages", "[]");

  document.getElementById("login").style.display = "none";
  document.getElementById("app").style.display = "block";

  document.getElementById("link").value =
    location.origin + "/send.html?to=" + id;
}

// LOAD MESSAGES
function loadMessages() {
  let msgs = JSON.parse(localStorage.getItem("messages") || "[]");
  let ul = document.getElementById("messages");
  ul.innerHTML = "";
  msgs.slice().reverse().forEach(m => {
    let li = document.createElement("li");
    li.textContent = m;
    ul.appendChild(li);
  });
}

// RECEIVE MESSAGES
function receiveMessages() {
  let key = "inbox_" + uid;
  let inbox = JSON.parse(localStorage.getItem(key) || "[]");

  if (inbox.length) {
    let msgs = JSON.parse(localStorage.getItem("messages"));
    msgs.push(...inbox);
    localStorage.setItem("messages", JSON.stringify(msgs));
    localStorage.removeItem(key);
    loadMessages();
  }
}

// SEND MESSAGE
function send() {
  let params = new URLSearchParams(location.search);
  let to = params.get("to");
  let text = document.getElementById("msg").value;
  if (!text) return;

  let key = "inbox_" + to;
  let box = JSON.parse(localStorage.getItem(key) || "[]");
  box.push(text);
  localStorage.setItem(key, JSON.stringify(box));

  alert("Anonim mesaj gönderildi");
  document.getElementById("msg").value = "";
}
