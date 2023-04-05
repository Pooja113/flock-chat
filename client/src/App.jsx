import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import Chat from "./Pages/Chat";
import ChatProvider from "./Context/ChatProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/chats",
    element: <Chat />,
  },
]);

function App() {
  return (
    <ChatProvider>
      <ChakraProvider>
        <div className="app">
          <RouterProvider router={router} />
        </div>
      </ChakraProvider>
    </ChatProvider>
  );
}

export default App;
