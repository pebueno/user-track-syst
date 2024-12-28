import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { Box } from "@mui/material";
import Home from "./home";
import UserDetails from "./userDetails";

const App = () => {
  return (
    <Box sx={{ maxWidth: 800, margin: "80px auto" }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users/:id" element={<UserDetails />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
};

export default App;
