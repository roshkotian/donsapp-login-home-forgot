import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import TextField from "material-ui/TextField";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import logo from "../../purdueLogo.jpg";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";

//const Regex = require("regex");
//const passwordRegex = Regex(/^[a-zA-Z0-9.#$%&/*-+]*$/);

const StyledButton = withStyles({
  root: {
    //background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    background: "#daaa00",
    fontWeight: "bolder",
    fontSize: "18px",
    borderRadius: 3,
    border: 0,
    color: "black",
    height: 40,
    padding: "0 30px"
  },
  label: {
    textTransform: "capitalize"
  }
})(Button);

/*const formValid = formErrors => {
  let valid = true;
  console.log(formErrors);
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });
  return valid;
};*/
export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      password: null,
      errors: [],
      formErrors: {
        username: "",
        password: ""
      }
    };
  }

  validateForm = () => {
    console.log("Coming inside validation");
    let { username, password, errors } = this.state;
    let formIsValid = true;
    console.log(username);
    console.log(password);

    if (
      !username ||
      username == "" ||
      username == undefined ||
      username === null
    ) {
      console.log("Coming inside if condition for username");
      formIsValid = false;
      errors["username"] = "* username is required";
    }

    if (!password || password === null) {
      console.log("Coming inside if condition for password");
      formIsValid = false;
      errors["password"] = "* Password is required";
    }
    this.setState({ errors });
    return formIsValid;
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log("Coming here");

    if (this.validateForm()) {
      let { username, password, errors } = this.state;
      let body = {
        userName: username,
        password
      };
      console.log("body ===>>>", body);

      axios({
        url: "http://localhost:5000/login/getLoginInfo",
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        data: JSON.stringify(body)
      })
        .then(response => {
          //console.log(JSON.stringify(response.data.success.value));
          //if (JSON.stringify(response.data.value) === true) {
          if (JSON.stringify(response.data.user).length < 15) {
            console.log("Login successful");
            //console.log(JSON.stringify(response));
            //this.setState({ errors: response.data.success });
            this.props.history.push("/home");
          } else {
            //if (response.error) {
            this.setState({ errors: response.data.user });
            console.log("Login unsuccessful");
          }
        })
        .catch(error => {
          //this.setState({ errors: error });
          console.log("Error while routing");
        });
    }
  };

  handleChange = e => {
    e.preventDefault();

    const { name, value } = e.target;
    let formErrors = this.state.formErrors;

    console.log("Name:", name);
    console.log("Value:", value);

    this.setState({ [e.target.name]: e.target.value });
    this.setState({
      errors: Object.assign(this.state.errors, { [e.target.name]: "" })
    });

    switch (name) {
      case "username":
        formErrors.username =
          value.length < 6 && value.length > 0
            ? "Username has to be 6 characters"
            : "";
        break;
      case "password":
        formErrors.password =
          value.length > 6 && value.length > 0
            ? ""
            : "Password has to be atleast 6 characters";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => {
      console.log(this.state);
    });
  };

  render() {
    const { formErrors, username, password, errors } = this.state;
    const preventDefault = event => event.preventDefault();

    return (
      <MuiThemeProvider>
        <React.Fragment>
          <AppBar
            title="DonsApp - Social Media Application"
            titleStyle={styles.color}
            style={{ background: "black" }}
          ></AppBar>
          <Grid container justify="center" alignItems="center">
            <Avatar alt="DonsApp Logo" src={logo} style={styles.bigAvatar} />
          </Grid>
          {errors.length > 0 && (
            <span style={styles.errorMessage}>{errors}</span>
          )}
          <br />
          <TextField
            hintText="Enter your username"
            floatingLabelText="Username"
            type="text"
            name="username"
            onChange={this.handleChange}
            error={username === ""}
            helperText={username === "" ? errors.username : " "}
          />
          <p style={styles.errorMessage}>{errors.username}</p>
          {formErrors.username.length > 0 && (
            <span style={styles.information}>{formErrors.username}</span>
          )}
          <div>
            <TextField
              id="standard-password-input"
              hintText="Enter your password"
              floatingLabelText="Password"
              type="password"
              name="password"
              autoComplete="current-password"
              onChange={this.handleChange}
            />
            <p style={styles.errorMessage}>{errors.password}</p>
            <br />
            {formErrors.password.length > 0 && (
              <span style={styles.information}>{formErrors.password}</span>
            )}
          </div>
          <br />
          <StyledButton onClick={this.handleSubmit}>Submit</StyledButton>
          <br />
          <br />
          <p style={styles.errorMessage}>
            <Link style={styles.navigation} to="/validateUserForm">
              Forgot Password
            </Link>{" "}
            &nbsp;&nbsp;&nbsp;
            <Link
              style={styles.navigation}
              href="www.google.com"
              onClick={preventDefault}
            >
              New User??
            </Link>
          </p>
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

const styles = {
  button: {
    margin: 15
  },
  bigAvatar: {
    margin: 5,
    width: 260,
    height: 300
  },
  title: {
    flexGrow: 1,
    align: "center"
  },
  root: {
    flexGrow: 1
  },
  errorMessage: {
    color: "red"
  },
  information: {
    color: "darkgreen",
    fontWeight: 600
  },
  navigation: {
    color: "black",
    fontWeight: 900
  },
  color: {
    color: "#daaa00",
    fontSize: 30
  }
};

export default Login;
