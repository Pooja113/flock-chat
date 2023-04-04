import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import Chat from "./Pages/Chat";

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
    <ChakraProvider>
      <div className="app">
        <RouterProvider router={router} />
      </div>
    </ChakraProvider>
  );
}

export default App;
