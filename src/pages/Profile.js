import React from "react";
import { auth } from "../services/firebase";
import Header from "../components/Header";
import logo from "../assets/edit.png";
import logo2 from "../assets/Group35.png";
import { Link } from "react-router-dom";
import "./Profile.css";

export default class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      originName: auth().currentUser.displayName,
      userName: auth().currentUser.displayName,
    };
    this.email = auth().currentUser.email;
    this.creationDate = auth().currentUser.metadata.creationTime;
    this.editName = this.editName.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  async editName(event) {
    event.preventDefault();
    const { userName } = this.state;
    await auth().currentUser.updateProfile({
      displayName: `${userName}`,
    });
    await this.setState({
      originName: userName,
    });
  }

  async userVerification(event) {
    var actionCodeSettings = {
      url: "https://chat-app-b62b2.web.app/",
      handleCodeInApp: false,
    };
    event.preventDefault();
    auth()
      .currentUser.sendEmailVerification(actionCodeSettings)
      .then(function () {
        alert("Please check your mailbox for account confirmation link");
      })
      .catch(function (error) {
        alert("Email Verification Error!Please try again later");
      });
  }

  render() {
    return (
      <div className="home-container">
        <Header />
        <div className="container4">
          <Link to="/">
            <img src={logo2} className="login-logo"></img>
          </Link>
          {!auth().currentUser.emailVerified ? (
            <div className="profile-container">
              <h1>Please verify your email address</h1>
              <p>
                In order to use "Penguime", you need to confirm your email
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
            <div className="profile-container">
              <h1 className="title">Profile</h1>
              <div className="info-container">
                <div className="userinfo">
                  {/* <div>{this.state.originName}</div> */}
                  <form onSubmit={this.editName} className="profile-form">
                    <strong>
                      <label htmlFor="userName">Username:</label>
                    </strong>
                    <input
                      placeholder="New UserName"
                      name="userName"
                      onChange={this.handleChange}
                      value={this.state.userName}
                      type="userName"
                      className="userName"
                    />
                    <img
                      src={logo}
                      className="editbtn"
                      onClick={this.editName}
                    ></img>
                  </form>
                </div>
                <div className="userinfo">
                  {" "}
                  <strong>Email:</strong> {this.email}
                </div>
                <div className="userinfo">
                  {" "}
                  <strong> Join date:</strong> {this.creationDate}
                </div>
              </div>
            </div>
          )}
        </div>
        <div></div>
      </div>
    );
  }
}
