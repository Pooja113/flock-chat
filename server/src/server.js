const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("../config/connect");
const register = require("./routes/userRoutes.js");
const chats = require("./routes/chatRoutes.js");

const cors = require("cors");
const Chat = require("./models/chatModel");
const { createChats } = require("./controllers/chatControllers");

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

  socket.on("msg", async ({ message, to,from }) => {
    console.log(message);
    createChats({ to, message, from });
    // try {
    //   const { userId, message } = req.body;
    //   if (!userId) {
    //     res.status(400).json({ message: "UserId has not been sent" });
    //   }
    //   const chat = await Chat.create({
    //     senderId: req.user._id,
    //     recieverId: userId,
    //     message,
    //   });

    //   res.status(201).json(chat);
    // } catch (error) {
    //   res.status(400).json({ message: error.message });
    // }

    socket.to(userSocketMap[to]).emit("msg", message);
  });
  // socket.on("disconnect", () => {
  //   console.log("Disconnect");
  //   // socket.broadcast.emit("user-disconnected", users[socket.id]);
  //   //delete userSocketMap[userId];
  //   // delete users[socket.id];
  // });
});
