const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "http://localhost:3000" } });
app.get("/", (req, res) => {
  res.send("Hello, World! Server is running.");
});
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("chatMessage", (msg) => io.emit("chatMessage", msg));
  socket.on("disconnect", () => console.log("A user disconnected"));
});

server.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
