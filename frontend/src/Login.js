import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

class Login extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      pass: "",
      failure: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

    handleSubmit(event) {
      // Call backend methed to verify login and return success of failure
      // call displayFailure if failed
      // call createSession if sucess
      this.displayFailure(event);
    }

    createSession(event) {
      localStorage.setItem("loggedIn", true);
    }

    displayFailure(event) {
      this.setState({pass: ''});
      alert("The email or password entered were incorrect. Please try again.");
      event.preventDefault();
    }

    handleInputChange(event) {
      const name = event.target.name;
      const value = event.target.value;
  
      this.setState({
        [name]: value
      });
    }

  render() {
    return (
      <div>
          <div class="login">
            <h1>Sign In</h1>
            <form method="post" onSubmit={this.handleSubmit}>
                <label htmlFor="email">Email</label><br></br>
                <input class="textfield" type="email" id="email" name="email" required value={this.state.email} onChange={this.handleInputChange}></input><br></br>
                <label htmlFor="pass">Password</label><br></br>
                <input class="textfield" type="password" id="pass" name="pass" required value={this.state.pass} onChange={this.handleInputChange}></input><br></br><br></br>
                <input class="submit" type="submit" value="Log In"></input>
            </form> 
            <h5 hidden>{this.state.failure}</h5>
            <a class="forgotPass" href="./forgotPass.html">Forgot Password</a>
            <a class="newAccount" href="./createAccount.html">Create New Account</a>
        </div>
      </div>
    )
  }
}

export default Login;