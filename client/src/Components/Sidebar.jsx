import { Avatar, Box, Text } from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { ChatState } from "../Context/ChatProvider";

const Sidebar = ({ handleClick }) => {
  const [users, setUsers] = useState();
  const [userIndex, setUserIndex] = useState(null);

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
      {users?.map((user, i) => (
        <Box
          cursor="pointer"
          _hover={{
            background: "aquamarine",
          }}
          background={userIndex == user?._id ? "aquamarine" : "#fff"}
          p={2}
          m="5px"
          borderWidth="1px"
          alignItems="center"
          color="black"
          key={user?._id}
          display="flex"
          onClick={() => {
            handleClick(user?._id);
            setUserIndex(user?._id);
          }}
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
