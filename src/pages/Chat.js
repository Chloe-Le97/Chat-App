import React, { Component } from "react";
import { auth } from "../services/firebase";
import { db } from "../services/firebase";
import Header from "../components/Header";
import "./Chat.styles.css";
import logo from "../assets/send.png";

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: auth().currentUser,
      chats: [],
      content: "",
      readError: null,
      writeError: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.userVerification = this.userVerification.bind(this);
  }

  async componentDidMount() {
    this.setState({ readError: null });
    try {
      db.ref("chats").on("value", (snapshot) => {
        let chats = [];
        snapshot.forEach((snap) => {
          chats.push(snap.val());
        });
        this.setState({ chats });
      });
    } catch (error) {
      this.setState({ readError: error.message });
    }
  }
  handleChange(event) {
    this.setState({
      content: event.target.value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ writeError: null });
    if (this.state.content !== "") {
      try {
        await db.ref("chats").push({
          content: this.state.content,
          timestamp: Date.now(),
          uid: this.state.user.uid,
          username: this.state.user.displayName,
          email: this.state.user.email,
        });
        this.setState({ content: "" });
      } catch (error) {
        this.setState({ writeError: error.message });
      }
    }
  }
  async userVerification(event) {
    var actionCodeSettings = {
      url: "https://chat-app-b62b2.web.app/",
      handleCodeInApp: false,
    };
    event.preventDefault();
    this.state.user
      .sendEmailVerification(actionCodeSettings)
      .then(function () {
        alert("Please check your mailbox for account confirmation link");
      })
      .catch(function (error) {
        alert("Email Verification Error!Please try again later");
      });
  }

  formatTime(timestamp) {
    const d = new Date(timestamp);
    const time = `${d.getDate()}/${
      d.getMonth() + 1
    }/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
    return time;
  }

  render() {
    return (
      <div>
        <Header />
        <div className="home-container">
          {!this.state.user.emailVerified ? (
            <div className="email-confirm">
              <h1>Please verify your email address</h1>
              <p>
                In order to use "Chat App", you need to confirm your email
                address
              </p>
              <button
                className="verify-btn"
                type="button"
                onClick={this.userVerification}
              >
                Verify email address
              </button>
            </div>
          ) : (
            <>
              {this.state.chats.map((chat) => {
                return (
                  <div
                    key={chat.timestamp}
                    className={
                      "chat-bubble " +
                      (this.state.user.uid === chat.uid
                        ? "current-mess"
                        : "other-mess")
                    }
                  >
                    {chat.username ? (
                      <div className="userName">{chat.username}</div>
                    ) : (
                      <div className="userName">{chat.email}</div>
                    )}
                    <div className="chat-container">
                      {chat.content}
                      <br />
                      <div className="chat-time">
                        {this.formatTime(chat.timestamp)}
                      </div>
                    </div>
                  </div>
                );
              })}

              <form onSubmit={this.handleSubmit} className="form">
                <input
                  onChange={this.handleChange}
                  value={this.state.content}
                  className="input"
                ></input>
                {this.state.error ? <p>{this.state.writeError}</p> : null}
                <img
                  src={logo}
                  className="send"
                  onClick={this.handleSubmit}
                ></img>
              </form>

              {this.state.user.displayName ? (
                <div className="user">
                  {" "}
                  Login in as : {this.state.user.displayName}
                </div>
              ) : (
                <div className="user">
                  {" "}
                  Login in as : {this.state.user.email}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    );
  }
}
