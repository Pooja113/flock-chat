import { Box, Button, FormControl, Input, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import io from "socket.io-client";

const ENDPOINT = "ws://localhost:3000";
var socket;

const ChatBox = ({ userId }) => {
  const { user } = ChatState();
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState();
  const fetchAllchats = async (userId) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      };

      const { data } = await axios.get(
        `http://localhost:3000/chats/${userId}`,
        config
      );
      setChats(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = async (userId) => {
    try {
      socket.emit("msg", { message, to: userId, from: user.id });
      setMessage(" ");
      const newchats = {
        message,
        senderId: user.id,
        createdAt: new Date(),
      };
      setChats([...chats, newchats]);
      console.log(chats);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("create-map", { userId: user.id });
  }, []);

  useEffect(() => {
    socket.on("msg", (message) => {
      console.log(`received msg: ${message}`);
      const newchats = {
        message,
      };
      setChats([...chats, newchats]);
    });
  });
  useEffect(() => {
    fetchAllchats(userId);
  }, [userId]);
  return (
    <Box
      flexDirection="column"
      justifyContent="flex-start"
      p={4}
      bg={"white"}
      flex="0.75"
      m="20px 0 15px 0"
      borderRadius="lg"
      borderWidth="1px"
    >
      {chats &&
        chats.map((chat) => {
          const time = chat.createdAt;
          const timestamp = Date.parse(time);
          const newtime = new Date(timestamp);
          const hours = newtime.getHours() % 12 || 12;
          const minutes = newtime.getMinutes();

          return (
            <div
              style={{
                display: "flex",
                justifyContent: `${
                  chat?.senderId === user.id ? "flex-start" : "flex-end"
                }`,
              }}
            >
              <div
                key={chat?._id}
                style={{
                  display: "flex",
                  background: `${
                    chat?.senderId === user.id ? "#e0edf8" : "#def5e5"
                  }`,
                  margin: "5px",
                  padding: "10px",
                  borderRadius: "10px",
                }}
              >
                {chat?.message}
                <span
                  style={{
                    display: "flex",
                    color: "rgb(132 128 128)",
                    fontSize: "12px",
                    alignItems: "end",
                    paddingLeft: "10px",
                  }}
                >
                  {hours}:{minutes}
                </span>
              </div>
            </div>
          );
        })}
      <FormControl
        id="first-name"
        isRequired
        mt={3}
        style={{ display: "flex" }}
      >
        <Input
          variant="filled"
          bg="#E0E0E0"
          placeholder="Enter a message.."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button onClick={() => handleSubmit(userId)} type="submit">
          Submit
        </Button>
      </FormControl>
    </Box>
  );
};

export default ChatBox;
