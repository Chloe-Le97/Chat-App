import React, { Component } from "react";
import { Link } from "react-router-dom";
import { signin, signInWithGoogle } from "../helpers/auth";
import logo from "../assets/Group35.png";

import "./Login.css";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
      email: "",
      password: "",
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
    this.setState({ error: "" });
    if (this.state.email == "" || this.state.password == "") {
      this.setState({ error: "Please type required fields" });
    } else {
      try {
        await signin(this.state.email, this.state.password);
        await this.setState({ error: "" });
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
            {/* <img src={logo} className="login-logo"></img> */}
            <div className="login-logo"></div>
          </Link>
          <form
            className="form-auth"
            autoComplete="off"
            onSubmit={this.handleSubmit}
          >
            <div className="form-title">
              <h1>Sign In</h1>
            </div>
            <div className="form-group">
              <input
                className="form-control"
                placeholder="Email"
                name="email"
                type="email"
                onChange={this.handleChange}
                value={this.state.email}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                placeholder="Password"
                name="password"
                onChange={this.handleChange}
                value={this.state.password}
                type="password"
              />
            </div>
            <div className="form-error">
              {this.state.error ? (
                <p className="text-danger">{this.state.error}</p>
              ) : null}
            </div>
            <div className="form-button">
              <div>
                <button className="loginbtn" type="submit">
                  Sign In
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
            <div className="addition">
              <div className="already">
                Don't have an account?{" "}
                <Link className="other" to="/signup">
                  Sign up
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
