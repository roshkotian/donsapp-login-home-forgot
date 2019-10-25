import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Login } from "./pages/login/login";
import { Home } from "./pages/homePage/Home"
import { ValidateUserForm } from "./pages/forgetPassword/validateUserForm"
import { ChangePasswordForm } from "./pages/forgetPassword/changePasswordForm"
import { SucessForm } from "./pages/forgetPassword/successForm"
import "./App.css";
import Navbar from './Navbar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
      {/* <Navbar className="nav"></Navbar> */}
          <Switch>
          {/*<div className="container">  </div>*/}
            <Route exact path="/" component={Login} />
            <Route exact path="/validateUserForm" component={ValidateUserForm} />
            <Route exact path="/changePasswordForm" component={ChangePasswordForm} />
            <Route exact path="/successForm" component={SucessForm} />
            <Route exact path="/home" component={Home} />
           
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
