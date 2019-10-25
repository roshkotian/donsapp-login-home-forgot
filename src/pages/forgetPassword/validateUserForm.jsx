import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import AppBar from "material-ui/AppBar";
import TextField from "material-ui/TextField";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import logo from "../../purdueLogo.jpg";
import Typography from '@material-ui/core/Typography';
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { Redirect } from 'react-router';

export class ValidateUserForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: null,
            securityQuestion: null,
            securityAnswer: null,
            password: null,
            confirmPassword: null,
            redirect: false,
            profile: '',
            formErrors: {
                userName: "",
                securityQuestion: "",
                securityAnswer: "",
                password: "",
                confirmPassword: ""
            },
            errors: {
            }
        }

    }

    validateForm = () => {
        console.log("Coming inside validation");
        let { userName, securityAnswer, errors } = this.state;
        let formIsValid = true;
        console.log(userName);
        console.log(securityAnswer);

        if (
            !userName ||
            userName === "" ||
            userName === undefined ||
            userName == null
        ) {
            console.log("Coming inside if condition for userName");
            formIsValid = false;
            errors["userName"] = "* userName is required";
        }

        // if (!securityQuestion || securityQuestion == null) {
        //     console.log("Coming inside if condition for securityQuestion");
        //     formIsValid = false;
        //     errors["securityQuestion"] = "* securityQuestion is required";
        //   }

        if (!securityAnswer || securityAnswer == null) {
            console.log("Coming inside if condition for securityAnswer");
            formIsValid = false;
            errors["securityAnswer"] = "* securityAnswer is required";
        }

        this.setState({ errors });
        return formIsValid;
    };

    handleChangsecurity(value) {
        this.setState({
            securityQuestion: value[0].value,
            errors: Object.assign(this.state.errors, { securityQuestion: "" })
        });
    }

    handleChangeSelectField = (event, index, value) => this.setState({ value });

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
            case "userName":
                formErrors.userName = value.length < 6 && value.length > 0 ? "UserName has to be 6 characters" : "";
                break;
            case "securityAnswer":
                formErrors.securityAnswer = value.length > 0 && value.length < 3 ? "securityAnswer should match with the records!" : "";
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

        if (this.validateForm()) {
            let { userName, securityAnswer } = this.state;
            let body = {
                userName: userName,
                securityAnswer: securityAnswer
            };
            console.log("body ===>>>", body);

            axios({
                url: "http://localhost:5000/password/getUserInfo",
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                data: JSON.stringify(body)

            }).then(response => {
                if (response) {
                    console.log("successful");
                    console.log(JSON.stringify(response));
                    console.log(JSON.stringify(response.status));
                    console.log(JSON.stringify(response.data));
                    //this.data = response.data;
                    //this.setState({data: response});

                    // if(!JSON.stringify(response.data)){
                    //     this.setState({errors: false});
                    // }
                    this.setState({
                        redirect: true,
                        profile: response.data
                    })
                    console.log("Here we go...................",this.state.userName, "  and  ", this.state.securityAnswer);
                    // if (this.validateForm()) {
                    //     let { userName, securityAnswer } = this.state;
                    //     let body1 = {
                    //         userName: userName,
                    //         securityAnswer: securityAnswer
                    //     }
                    //this.props.history.push('/changePasswordForm')
                } else {
                    console.log("unsuccessful");
                }
              }).catch(error => {
                    console.log("Error while routing");
                    console.log(error);
                });
        }
    };
    render() {
        //const { step } = this.state;
        const { formErrors, userName, securityAnswer, errors } = this.state;
        const { redirect } = this.state

        if (redirect)
            return (<Redirect to={{
                pathname: '/changePasswordForm',
                state: { referrer: this.state.userName }
            }} />)
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
                    <TextField hintText="Enter your username"
                        floatingLabelText="UserName"
                        type="text"
                        name="userName"
                        error={userName === ""}
                        helperText={userName === "" ? errors.userName : " "}
                        userName={this.state.userName}
                        
                        onChange={this.handleChange.bind(this)}/>
                    <p style= {styles.errorMessage}>{errors.userName}</p>
                    {formErrors.userName.length > 0 && (
                        <span style={styles.information}>{formErrors.userName}</span>
                    )}
                    <br />
                    <SelectField
                        floatingLabelFixed={true}
                        hintText="SecurityQuestion"
                        value={this.state.value}
                        name="securityQuestion"
                        onChange={this.handleChangeSelectField}
                        style={styles.customWidth}>
                        <MenuItem value={1} primaryText="What is the name of your pet?" />
                        <MenuItem value={2} primaryText="What is your favourite car?" />
                        <MenuItem value={3} primaryText="Where were you born?" />
                    </SelectField>
                    <br />

                    <TextField hintText="Enter your security answer"
                        floatingLabelText="SecurityAnswer" type="text"
                        name="securityAnswer"
                        helperText={securityAnswer === "" ? errors.securityAnswer : " "}
                        onChange={this.handleChange} />
                    <p style= {styles.errorMessage}>{errors.securityAnswer}</p>
                    {formErrors.securityAnswer.length > 0 && (
                        <span style={styles.information}>{formErrors.securityAnswer}</span>
                    )}
                    <br />
                    <StyledButton onClick={this.handleSubmit} >Continue</StyledButton>

                </React.Fragment>
            </MuiThemeProvider>
        )
    }


}


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
        height: 48,
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

export default ValidateUserForm;
