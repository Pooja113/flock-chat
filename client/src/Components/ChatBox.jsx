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
      // const config = {
      //   headers: {
      //     "Content-type": "application/json",
      //     Authorization: `Bearer ${user?.token}`,
      //   },
      // };

      // const { data } = await axios.post(
      //   `http://localhost:3000/chats`,
      //   { userId, message },
      //   config
      // );
      const textMessage = message;
      const recieverId = userId;
      socket.emit("msg", { message: textMessage, to: recieverId });
      setMessage(" ");
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("create-map", { userId });
  }, [userId]);

  useEffect(() => {
    socket.on("msg", (message) => {
      console.log(`received msg: ${message}`);
      setChats([...chats, { message }]);
    });
  }, [chats]);
  console.log(chats);
  useEffect(() => {
    fetchAllchats(userId);
  }, [userId]);
  console.log(chats);
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      p={4}
      bg={"white"}
      flex="0.75"
      m="20px 0 15px 0"
      borderRadius="lg"
      borderWidth="1px"
      alignItems="flex-start"
    >
      {chats &&
        chats.map((chat) => {
          return (
            <div
              key={chat?._id}
              style={{
                display: "flex",
                background: "#e7f0f7",
                margin: "5px",
                padding: "10px",
                borderRadius: "10px",
              }}
            >
              {chat?.message}
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
