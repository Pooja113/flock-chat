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
    userSocketMap[userId] = socket.id;
    socketUserMap[socket.id] = userId;
  });
  socket.on("msg", ({ message, to }) => {
    console.log(message);
    socket.emit("msg", message);
  });
});
