import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreatePost from "./components/CreatePost";
import ContactUs from "./components/ContactUs";
import PostDetails from "./components/PostDetials";

function App() {
  return (
    <div className="main-content">
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> 
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/post/:id" element={<PostDetails />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
