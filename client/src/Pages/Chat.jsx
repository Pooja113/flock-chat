import { Box } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import ChatBox from "../Components/ChatBox";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import { ChatState } from "../Context/ChatProvider";

const Chat = () => {
  const { user } = ChatState();
  const [userId, setUserId] = useState();
  const handleClick = async (id) => {
    
    setUserId(id);
  };

  return (
    <div style={{ width: "100%" }}>
      {user && <Header />}
      <Box display="flex">
        {user && <Sidebar handleClick={handleClick} />}
        {user && <ChatBox userId={userId} />}
      </Box>
    </div>
  );
};

export default Chat;
