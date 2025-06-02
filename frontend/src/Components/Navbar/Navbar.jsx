import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const handleScroll = (event, sectionId) => {
    event.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className="navbar">
      <div className="nav_icon">
        <Link to="/">
          <h1>Signfy</h1>
        </Link>
      </div>
      <div className="nav_items">
        <Link to="/">Home</Link>
        <Link to="#about-section" onClick={(e) => handleScroll(e, "about-section")}>About</Link>
        <Link to="#service-section" onClick={(e) => handleScroll(e, "service-section")}>Service</Link>
      </div>
    </nav>
  );
};

export default Navbar;
