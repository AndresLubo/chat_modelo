import path from "path";
import express from "express";
import http from "http";
import { Server as WebSocketServer } from "socket.io";

//* settings
const port = 3000;
const app = express();
const httpServer = http.createServer(app);
const io = new WebSocketServer(httpServer);

//* websockets
io.on("connection", (socket) => {
  console.log("Usuario conectado: ", socket.id);

  socket.on("client:chatmessage", (data) => {
    io.sockets.emit("server:newmessage", data);
  });

  socket.on("client:chattyping", (username) => {
    socket.broadcast.emit('server:chattyping', username)
  });
});

//* static files
app.use(express.static(path.join(__dirname, "public")));

//* start the server
httpServer.listen(port, () => console.log(`app running on port ${port}`));
