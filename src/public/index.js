const socket = io();

//* DOM elements
const message = document.getElementById("message");
const username = document.getElementById("username");
const btn = document.getElementById("send");
const output = document.getElementById("output");
const actions = document.getElementById("actions");

btn.addEventListener("click", (e) => {
  socket.emit("client:chatmessage", {
    username: username.value,
    message: message.value,
  });
});

message.addEventListener("keypress", (e) => {
  socket.emit("client:chattyping", username.value);
});

socket.on("server:newmessage", (data) => {
  actions.innerHTML = "";
  output.innerHTML += `
        <p>
            <strong>${data.username}</strong> : ${data.message}
        </p>
    `;
  console.log(data);
});

socket.on("server:chattyping", (data) => {
  actions.innerHTML = `
        <p>
            <en>${data} is typing a message...</en>
        </p>
    `;
});
