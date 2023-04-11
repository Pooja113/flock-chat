import { Box, Text, Button, Avatar } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };
  return (
    <Box
      display="flex"
      justifyContent="center"
      p={3}
      bg={"white"}
      w="100%"
      borderRadius="lg"
      borderWidth="1px"
    >
      <Text
        fontSize="4xl"
        fontFamily="'Righteous', cursive"
        flex={0.85}
        display="flex"
        justifyContent="center"
      >
        Flock App
      </Text>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flex: "0.1",
          justifyContent: "space-around",
        }}
      >
        <Avatar />
        <Button onClick={logoutHandler}>Logout</Button>
      </div>
    </Box>
  );
};

export default Header;
