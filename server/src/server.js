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
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

const userSocketMap = {};
const socketUserMap = {};

io.on("connection", (socket) => {
  console.log(`connected socketid: ${socket.id}`);
  socket.on("create-map", ({ userId }) => {
    console.log("userId", userId);
    console.log("socket.id", socket.id);
    userSocketMap[userId] = socket.id;
    socketUserMap[socket.id] = userId;
    console.log(`userSocketMap: ${JSON.stringify(userSocketMap)}`);
    console.log(`socketUserMap: ${JSON.stringify(socketUserMap)}`);
  });
  //console.log(socket.id);
  //  userSocketMap[userId] = socket.id;
  // // socket.on("new-user", (user) => {
  // //   users[socket.id] = user;
  // //   socket.broadcast.emit("user-connected", user);
  // // });
  // socket.on("message", (message) => {
  //   var chat = message.chat;
  //   chat.users.forEach((user) => {
  //     if (user._id == newMessageRecieved.sender._id) return;

  //     socket.in(user._id).emit("message recieved", newMessageRecieved);
  //   });
  //   console.log(chat)
  // });
  socket.on("msg", ({ message, to }) => {
    console.log(message);
    socket.emit("msg", message);
    // socket
    //   .to(userSocketMap[to])
    //   .emit("msg", { message, from: socketUserMap[socket.id] });
  });
  // socket.on("disconnect", () => {
  //   console.log("Disconnect");
  //   // socket.broadcast.emit("user-disconnected", users[socket.id]);
  //   //delete userSocketMap[userId];
  //   // delete users[socket.id];
  // });
});
