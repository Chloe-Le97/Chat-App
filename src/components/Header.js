import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../services/firebase";
import "./Header.css";

function Header() {
  return (
    <div className="header-container">
      <button>
        <Link to="/">Home</Link>
      </button>
      {auth().currentUser ? (
        <div className="navbar-nav">
          <button className="header-btn">
            <Link className="nav-item" to="/profile">
              Profile
            </Link>
          </button>
          <button className="header-btn">
            <Link className="nav-item" to="/chat">
              Chat Box
            </Link>
          </button>
          <button className="header-btn" onClick={() => auth().signOut()}>
            Logout
          </button>
        </div>
      ) : (
        <div className="navbar-nav">
          <button className="header-btn">
            <Link className="nav-item" to="/login">
              Sign In
            </Link>
          </button>
          <button className="header-btn">
            <Link className="nav-item" to="/signup">
              Sign Up
            </Link>
          </button>
        </div>
      )}
    </div>
  );
}
export default Header;
