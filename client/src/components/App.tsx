import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { Box } from "@mui/material";
import Home from "./home";
import UserDetails from "./userDetails";
import { UsersProvider } from "./contexts/UsersContext";

const App = () => {
  return (
    <UsersProvider>
      <Box sx={{ maxWidth: 800, margin: "80px auto" }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users/:id" element={<UserDetails />} />
          </Routes>
        </BrowserRouter>
      </Box>
    </UsersProvider>
  );
};

export default App;
