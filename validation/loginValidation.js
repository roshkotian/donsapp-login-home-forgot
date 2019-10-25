const Validator = require("validator");

const lengthInput = function(inputName, min, max, errorMessage) {
  if (!Validator.isLength(inputName, { min, max })) return errorMessage;
};

const loginValidation = data => {
  const { userName, password } = data;
  let errors = {};

  // Length input value validation
  errors.email = lengthInput(
    userName,
    6,
    20,
    "The email field must be greater than 6 characters"
  );
  errors.password = lengthInput(
    password,
    8,
    20,
    "The password field must be greater than 8 characters"
  );
  // Email validate format
  //if (!Validator.isEmail(email)) errors.email = 'Email format is incorrect';
  // Empty validation
  if (Validator.isEmpty(userName))
    errors.userName = "Username field is required";
  if (Validator.isEmpty(password))
    errors.password = "Password field is required";

  // if each key of errors is undefined, we must empty the objects
  if (!errors.userName && !errors.password) errors = {};

  return {
    errors,
    isValid: Object.keys(errors).length
  };
};

module.exports = loginValidation;
