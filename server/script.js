const socket = io("http://localhost:3000");
const messageForm = document.getElementById("message-form");
const messageInput = document.getElementById("msg-input");
const messageOutput = document.getElementById("msg-output");

const user = prompt("What is your name?");
appendMessage("Joined");
socket.emit("new-user", user);

socket.on("user-connected", (user) => {
  appendMessage(`${user} connected`);
});

socket.on("user-disconnected", (name) => {
  appendMessage(`${name} disconnected`);
});

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  appendMessage(`You: ${message}`);
  socket.emit("chat-message", message);
  messageInput.value = "";
});

socket.on("message", (data) => {
  appendMessage(`${data.name}: ${data.message}`);
});

function appendMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageOutput.append(messageElement);
}
