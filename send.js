const params = new URLSearchParams(window.location.search);
const to = params.get("to");

function send() {
  const input = document.getElementById("msg");
  const text = input.value.trim();
  if (!text || !to) return;

  const key = "inbox_" + to;
  const inbox = JSON.parse(localStorage.getItem(key) || "[]");

  inbox.push(text);
  localStorage.setItem(key, JSON.stringify(inbox));

  alert("Anonim mesaj gönderildi");
  input.value = "";
}
