const params = new URLSearchParams(window.location.search);
const to = params.get("to");

function send() {
  const msg = document.getElementById("msg").value.trim();
  if (!msg || !to) return;

  const key = "messages_" + to;
  const data = JSON.parse(localStorage.getItem(key) || "[]");

  data.push(msg);
  localStorage.setItem(key, JSON.stringify(data));

  alert("Gönderildi");
  document.getElementById("msg").value = "";
}
