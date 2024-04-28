import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/home"
          element={
            <div>
              <Navbar />
              <Home />
              <Footer />
            </div>
          }
        />
      </Routes>
    </>
  );
};

export default App;
