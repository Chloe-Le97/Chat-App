import React, { Component } from "react";
import { auth } from "../services/firebase";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import "./Home.css";
import logo from "../assets/Group41.png";

export default class HomePage extends Component {
  render() {
    return (
      <div>
        <Header></Header>
        <div className="home-container">
          <div className="home">
            <h1 className="title">Penguime</h1>
            <div className="home-logo"></div>
            {/* <img src={logo} className="home-logo"></img> */}
            <div>
              {auth().currentUser ? (
                <>
                  <div className="welcome">
                    Welcome {auth().currentUser.displayName}!
                  </div>
                  <div className="account">
                    <Link className="home-btn" to="/profile">
                      My Profile
                    </Link>
                    <Link className="home-btn" to="/chat">
                      Chat Box
                    </Link>
                  </div>
                </>
              ) : (
                <div className="account">
                  <Link className="home-btn" to="/signup">
                    Create New Account
                  </Link>
                  <Link className="home-btn" to="/login">
                    Login to Your Account
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
