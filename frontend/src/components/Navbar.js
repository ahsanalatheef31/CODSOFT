import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../CssFiles/Navbar.css';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="navbar-container">
      <nav className="navbar">
        <h2>NoteFeed</h2>

        <div className="hamburger" onClick={toggleMenu}>☰</div>

        <div className={`nav-links ${menuOpen ? "active" : ""}`}>
          <Link to="/home" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/create" onClick={() => setMenuOpen(false)}>Create Post</Link>
          <Link to="/login" onClick={() => setMenuOpen(false)}>Logout</Link>
          <Link to="/contactUs" onClick={() => setMenuOpen(false)}>Contact Us</Link>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
