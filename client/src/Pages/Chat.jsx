import React from "react";
import ChatBox from "../Components/ChatBox";
import Header from "../Components/Header";
import { ChatState } from "../Context/ChatProvider";

const Chat = () => {
  const { user } = ChatState();
  return (
    <div style={{ width: "100%" }}>
      {user && <Header />}
      {user && <ChatBox />}
    </div>
  );
};

export default Chat;
