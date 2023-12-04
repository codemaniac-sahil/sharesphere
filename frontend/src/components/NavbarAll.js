import React from "react";
import "../styles/navbarall.css";
import { NavLink, useNavigate } from "react-router-dom";
function NavbarAll() {
  const navigate = useNavigate();
  const handleOnClick = () => {
    navigate("/addpost");
  };
  return (
    <div className="navbar">
      <div className="navbar-left">
        <div className="navbar-left-logo">
          <NavLink to="/dashboard">
            <h1>ShareSphere</h1>
          </NavLink>
        </div>
      </div>
      <div className="navbar-right">
        <div className="navbar-right-btn">
          <button onClick={handleOnClick}>Add Post</button>
          <NavLink to="/logout">Logout</NavLink>
        </div>
      </div>
    </div>
  );
}

export default NavbarAll;
