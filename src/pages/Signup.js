import React, { Component } from "react";
import { Link } from "react-router-dom";
import { signup, signInWithGoogle } from "../helpers/auth";
import { db } from "../services/firebase";
import logo from "../assets/Group35.png";
import "./SignUp.css";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.googleSignIn = this.googleSignIn.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    if (this.state.password !== this.state.confirmPassword) {
      this.setState({ error: "Password does not match" });
    } else if (this.state.email == "" || this.state.password == "") {
      this.setState({ error: "Please type required fields" });
    } else {
      try {
        await signup(
          this.state.username,
          this.state.email,
          this.state.password
        );
      } catch (error) {
        this.setState({ error: error.message });
      }
    }
  }

  async googleSignIn() {
    try {
      await this.setState({ error: "" });
      await signInWithGoogle();
    } catch (error) {
      this.setState({ error: error.message });
    }
  }
  render() {
    return (
      <div className="home-container">
        <div></div>
        <div>
          <Link to="/">
            <div className="login-logo"></div>
          </Link>
          <form className="form-auth" onSubmit={this.handleSubmit}>
            <div className="form-title">
              <h1>Sign Up</h1>
            </div>

            <div className="form-group">
              <input
                className="form-control"
                placeholder="Username"
                name="username"
                type="username"
                onChange={this.handleChange}
                value={this.state.username}
              ></input>
            </div>
            <div className="form-group">
              <input
                className="form-control"
                placeholder="Email"
                name="email"
                type="email"
                onChange={this.handleChange}
                value={this.state.email}
              ></input>
            </div>
            <div className="form-group">
              <input
                className="form-control"
                placeholder="Password"
                name="password"
                onChange={this.handleChange}
                value={this.state.password}
                type="password"
              ></input>
            </div>
            <div className="form-group">
              <input
                className="form-control"
                placeholder="Repeat Password"
                name="confirmPassword"
                onChange={this.handleChange}
                value={this.state.confirmPassword}
                type="password"
              ></input>
            </div>
            <div>
              {this.state.error ? (
                <div className="form-error">{this.state.error}</div>
              ) : null}
              <div>
                <button className="loginbtn" type="submit">
                  Sign Up
                </button>
              </div>
              <div>
                <button
                  className="loginGg"
                  type="button"
                  onClick={this.googleSignIn}
                >
                  Sign In With Google
                </button>
              </div>
            </div>
            <div>
              <div className="already">
                Already have an account?{" "}
                <Link className="other" to="/login">
                  Login
                </Link>
              </div>

              <div className="reset">
                Forget your password?
                <Link className="forgot" to="/resetPassword">
                  Reset Password
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Signup;
