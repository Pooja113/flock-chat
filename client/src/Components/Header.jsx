import { Box, Menu, MenuButton, Text, Button } from "@chakra-ui/react";
import React from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";

const Header = () => {
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
      <div style={{ display: "flex", alignItems: "center" }}>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            name
          </MenuButton>
        </Menu>
      </div>
    </Box>
  );
};

export default Header;
