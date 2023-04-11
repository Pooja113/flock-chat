import { Avatar, Box, Text } from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { ChatState } from "../Context/ChatProvider";

const Sidebar = ({ handleClick }) => {
  const [users, setUsers] = useState();
  const [chats, setChats] = useState();

  const { user } = ChatState();
  const fetchAllusers = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };

    const { data } = await axios.get(`http://localhost:3000/user/all`, config);
    setUsers(data);
  };
  useEffect(() => {
    fetchAllusers();
  }, []);

  const fetchChats = async (id) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      };

      console.log(user?.token);
      const { data } = await axios.get(
        `http://localhost:3000/chats/${id}`,
        config
      );
      setChats(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "rgb(247 247 247)",
        margin: "20px 20px 15px 10px",
        flex: "0.25 ",
        height: "87vh",
      }}
    >
      {users?.map((user) => (
        <Box
          cursor="pointer"
          _hover={{
            background: "aquamarine",
          }}
          p={2}
          m="5px"
          borderWidth="1px"
          alignItems="center"
          color="black"
          key={user?._id}
          display="flex"
          onClick={() => handleClick(user?._id)}
        >
          <Avatar
            mr={2}
            size="sm"
            cursor="pointer"
            name={user.name}
            src={user.pic}
          />
          <Box>
            <Text>{user.name}</Text>
            <Text fontSize="xs">
              <b>Email : </b>
              {user.email}
            </Text>
          </Box>
        </Box>
      ))}
    </div>
  );
};

export default Sidebar;
