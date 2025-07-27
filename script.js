let users = JSON.parse(localStorage.getItem('users') || '[]');
let currentUser = null;
let messages = JSON.parse(localStorage.getItem('chat') || '[]');

function register() {
  const email = document.getElementById("email").value;
  const username = document.getElementById("username").value;
  if (!email || !username) return alert("Заполните поля");
  if (users.find(u => u.email === email)) return alert("Email уже используется");
  users.push({ email, username });
  localStorage.setItem("users", JSON.stringify(users));
  alert("Регистрация прошла успешно!");
}

function login() {
  const email = document.getElementById("email").value;
  const user = users.find(u => u.email === email);
  if (!user) return alert("Пользователь не найден");
  currentUser = user;
  document.getElementById("auth").style.display = "none";
  document.getElementById("main").style.display = "block";
  document.getElementById("currentUser").innerText = user.username;
  renderUsers();
  renderMessages();
}

function logout() {
  currentUser = null;
  document.getElementById("main").style.display = "none";
  document.getElementById("auth").style.display = "block";
}

function toggleUsers() {
  const u = document.getElementById("users");
  u.style.display = u.style.display === "none" ? "block" : "none";
}

function renderUsers() {
  const ul = document.getElementById("userList");
  ul.innerHTML = "";
  users.forEach(u => {
    const li = document.createElement("li");
    li.textContent = u.username;
    ul.appendChild(li);
  });
}

function toggleChat() {
  const c = document.getElementById("chat");
  c.style.display = c.style.display === "none" ? "block" : "none";
}

function sendMessage() {
  const msg = document.getElementById("message").value;
  if (!msg) return;
  messages.push({ user: currentUser.username, text: msg });
  localStorage.setItem("chat", JSON.stringify(messages));
  document.getElementById("message").value = "";
  renderMessages();
}

function renderMessages() {
  const box = document.getElementById("chatBox");
  box.innerHTML = "";
  messages.forEach(m => {
    const p = document.createElement("p");
    p.textContent = `${m.user}: ${m.text}`;
    box.appendChild(p);
  });
  box.scrollTop = box.scrollHeight;
}

function toggleDev() {
  const d = document.getElementById("dev");
  d.style.display = d.style.display === "none" ? "block" : "none";
}

function checkDev() {
  const pass = document.getElementById("devPass").value;
  if (pass === "5565") {
    document.getElementById("devPanel").style.display = "block";
  } else {
    alert("Неверный пароль");
  }
}

// Загрузка сообщений
function loadMessages() {
  const messages = JSON.parse(localStorage.getItem("chatMessages") || "[]");
  const messagesDiv = document.getElementById("messages");
  messagesDiv.innerHTML = "";
  messages.forEach(msg => {
    const div = document.createElement("div");
    div.textContent = `${msg.user}: ${msg.text}`;
    messagesDiv.appendChild(div);
  });
}

// Отправка сообщения
function sendMessage() {
  const text = document.getElementById("messageInput").value;
  const user = localStorage.getItem("currentUser") || "Гость";
  if (!text.trim()) return;

  const messages = JSON.parse(localStorage.getItem("chatMessages") || "[]");
  messages.push({ user, text });
  localStorage.setItem("chatMessages", JSON.stringify(messages));
  document.getElementById("messageInput").value = "";
  loadMessages();
}

// Автозагрузка при открытии
loadMessages();

