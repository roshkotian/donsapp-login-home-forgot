const express = require("express");
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

const login = require('../models/loginInformation.model');

//gets user login information from mongodb/login collection based on username and security answer
exports.getUserDetails = async (req, res) => {
  console.log("Request name", req.body.userName);
  console.log("Request answer", req.body.securityAnswer);
  let { userName, securityAnswer } = req.body;
  // validate userName
  // function validateName(name) {
  //   if (name.length <= 8 || name === "" || name === null) return true;
  //   return false;
  // }
  // if (!validateName(userName)) return res.send('userName is either empty or must not have atleast 8 characters');
  // // validate securityAnswer
  // function validateSecurityAnswer(securityAnswer) {
  //   if (securityAnswer<3 || securityAnswer === "" || securityAnswer === null) return res.send('securityAnswer is either empty or must not have atleast 3 characters');;
  //   return false;
  // }
  

  login.find({ userName: req.body.userName, securityAnswer: req.body.securityAnswer })
    .then(Login => res.json(Login))
    .catch(error => {
      console.log(error)
      res.status(400).send({ error: 'Error while getting userInformation from login collection by userName' })
    })
};

//update password by userName
exports.resetPassword = async (req, res) => {
  console.log("Request name", req.body.userName);
  console.log("Request answer", req.body.password);
  let { userName, password } = req.body;
  try {
    hashedPassword = await bcrypt.hash(password, 10);
  } catch {
    res.status(500).send();
  }
  const encryptPassword = { userName, password: hashedPassword };

  // function validatePassword(name) {
  //   if (name.length <= 8 || name === "" || name === null) return true;
  //   return false;
  // }
  // // validate password
  // if (!validatePassword(password)) return res.send('Either password is empty or must not have atleast 8 characters');

  const updatepassword = new login(encryptPassword);
  console.log("Request name", updatepassword);
  login.findOneAndUpdate({ userName: req.body.userName }, { $set: { password: hashedPassword } }, { upsert: true }, function (err, doc) {
    if (err) { throw err; }
    else { console.log("Updated", doc); res.status(200).send();}
  });
};





