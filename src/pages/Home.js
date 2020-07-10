import React, { Component } from "react";
import { auth } from "../services/firebase";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import "./Home.css";

export default class HomePage extends Component {
  render() {
    return (
      <div>
        <Header></Header>
        <div className="home-container">
          <div className="home">
            <h1 className="title">CHAT APP!</h1>
            {auth().currentUser ? (
              <div className="account">
                <Link className="btn" to="/chat">
                  Chat Box
                </Link>
                <Link className="btn" to="/profile">
                  My Profile
                </Link>
              </div>
            ) : (
              <div className="account">
                <Link className="btn" to="/signup">
                  Create New Account
                </Link>
                <Link className="btn" to="/login">
                  Login to Your Account
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
