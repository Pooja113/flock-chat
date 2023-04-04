const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("../config/connect");
const register = require("./routes/userRoutes.js");
const chats = require("./routes/chatRoutes.js");

const cors = require("cors");

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use("/user", register);
app.use("/chats", chats);

const PORT = process.env.PORT;
connectDB(process.env.MONGODB_URL);

const server = app.listen(
  PORT,
  console.log(`Server running on  http://localhost:${PORT}`)
);

const io = require("socket.io")(server, {
  cors: {
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST"],
  },
});

const users = {};

io.on("connection", (socket) => {
  socket.on("new-user", (user) => {
    users[socket.id] = user;
    socket.broadcast.emit("user-connected", user);
  });
  socket.on("chat-message", (message) => {
    socket.broadcast.emit("message", {
      message,
      name: users[socket.id],
    });
  });
  socket.on("disconnect", () => {
    socket.broadcast.emit("user-disconnected", users[socket.id]);
    delete users[socket.id];
  });
});
