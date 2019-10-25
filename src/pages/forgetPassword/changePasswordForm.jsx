import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import AppBar from "material-ui/AppBar";
import TextField from "material-ui/TextField";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import logo from "../../purdueLogo.jpg";
//import { red } from "@material-ui/core/colors";
import Typography from '@material-ui/core/Typography';
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";


export class ChangePasswordForm extends Component {

  constructor(props) {
    super(props);
console.log(this.props.location.state.referrer)
    this.state = {
      userName: this.props.location.state.referrer,
      password: null,
      confirmPassword: null,
      formErrors: {
        userName: "",
        password: "",
        confirmPassword: ""
      },
      errors: {
      }
    }
   
  }
 
  validatePasswordForm = () => {
   
    console.log("Coming inside validation");
    let { password, confirmPassword, errors } = this.state;
    let formIsValid = true;
    console.log(password);
    console.log(confirmPassword);

    if (
      !password ||
      password === "" ||
      password === undefined ||
      password == null
    ) {
      console.log("Coming inside if condition for password");
      formIsValid = false;
      errors["password"] = "* password is required";
    }

    if (
      !confirmPassword ||
      confirmPassword === "" ||
      confirmPassword === undefined ||
      confirmPassword == null
    ) {
      console.log("Coming inside if condition for confirmPassword");
      formIsValid = false;
      errors["confirmPassword"] = "* confirmPassword is required";
    }

    if (
      confirmPassword !== password
    ) {
      console.log("Coming inside if condition for comparing passwords");
      formIsValid = false;
      errors["confirmPassword"] = "* passwords are not matching!!";
    }
    this.setState({ errors });
    return formIsValid;
  };

  // to go back to the previous page
  back = (e) => {
    e.preventDefault();
    this.props.history.push('/validateUserForm')
  };

  handleChange = e => {
    e.preventDefault();
    console.log(e.target.value)
    const name = e.target.name;
    const value = e.target.value;

    // this.setState({[name]: value});
    this.setState({ [e.target.name]: e.target.value })
    this.setState({
      errors: Object.assign(this.state.errors, { [e.target.name]: "" })

    });
    let formErrors = this.state.formErrors;
    switch (name) {
      case "password":
        formErrors.password = value.length > 8 && value.length > 0 ? "" : "Password has to be atleast 8 characters!";
        break;
      case "confirmPassword":
        formErrors.confirmPassword = value.length > 8 && value.length > 0 ? "" : "ConfirmPassword should match with password!";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => {
      console.log(this.state);
    })

  };

  handleSubmit = e => {
    e.preventDefault();
    console.log("Coming here");

  
    if (this.validatePasswordForm()) {
      let { userName, password } = this.state;
      console.log("Coming here", userName);
      console.log("Coming here", password);
  
      let body = {
        userName: userName,
        password: password
      };
      console.log("body ===>>>", body);

      axios({
        url: "http://localhost:5000/password/updatePassword",
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        data: JSON.stringify(body)

      }).then(response => {
        if (response) {
          console.log("successful");
          console.log(JSON.stringify(response));
          console.log(JSON.stringify(response.status));
          console.log("Password has been reset successfully!");
          this.props.history.push('/successForm')
          
        } else {
          console.log("Password has not been reset!");
        }
      })
        .catch(error => {
          console.log("Error while routing to forgotPasswordComponent/successForm");
          console.log(error);
        });
    }
  };


  render() {

    const { formErrors, password, confirmPassword, errors } = this.state;
    return (
      <MuiThemeProvider>
        <React.Fragment>
          <AppBar title="DonsApp - Social Media Application" style={{ background: "#212121" }}> </AppBar>
          <Grid container justify="center" alignItems="center">
            <Avatar alt="DonsApp Logo" src={logo} style={styles.bigAvatar} />
          </Grid>
          <ThemeProvider theme={theme}>
            <div>
              <Typography variant="subtitle1">Account Recovery</Typography>
            </div>
          </ThemeProvider>

          <br />
          <TextField id="standard-password-input"
            hintText="Enter your password"
            floatingLabelText="Password"
            type="password"
            name="password"
            error={password === ""}
            helperText={password === "" ? errors.password : " "}
            onChange={this.handleChange} />
          <p style= {styles.errorMessage}>{errors.password}</p>
          {formErrors.password.length > 0 && (
            <span style={styles.information}>{formErrors.password}</span>
          )}
          <br />
          <TextField id="standard-confirmpassword-input"
            hintText="Re Enter your password"
            floatingLabelText="ConfirmPassword"
            type="password"
            name="confirmPassword"
            error={confirmPassword === ""}
            helperText={confirmPassword === "" ? errors.confirmPassword : " "}
            onChange={this.handleChange} />
          <p style= {styles.errorMessage}>{errors.confirmPassword}</p>
          {formErrors.confirmPassword.length > 0 && (
            <span style={styles.information}>{formErrors.confirmPassword}</span>
          )}
          <br />
          <br />

          <StyledButton onClick={this.handleSubmit}>Continue</StyledButton> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <StyledButton onClick={this.back.bind(this)}>Back</StyledButton>
        </React.Fragment>
      </MuiThemeProvider>
    )
  }
};

const StyledButton = withStyles({
  root: {
    //background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    //background: "black",
    background: "#daaa00",
    fontWeight: "bolder",
    fontSize: "18px",
    borderRadius: 3,
    border: 0,
    color: "black",
    height: 40,
    padding: "0 30px"
    //boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)"
  },
  label: {
    textTransform: "capitalize"
  }
})(Button);

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
  customWidth: {
    width: 270,
  },
   information: {
        color: "darkgreen",
        fontWeight: 600
      }, 
};

const theme = createMuiTheme({
  typography: {
    subtitle1: {
      fontSize: 30,
    },
    subtitle: {
      fontSize: 30,
    }
  },
});

export default ChangePasswordForm;