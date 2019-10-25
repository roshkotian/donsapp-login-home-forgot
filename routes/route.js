const router = require("express").Router();
//let post = require("../models/posts.model");
const postController = require("../controllers/posts.controller");
const loginController = require("../controllers/loginController");
const passwordController = require('../controllers/password.controller')

//getall posts from mongodb
router.get("/", postController.getallposts);
router.post("/save", postController.save);

// Saving Login Information
//router.post("/loginAdd", loginController.save);
console.log("Getting into router");
router.post("/getLoginInfo", loginController.authenticate);

//forgot password 

router.post('/getUserInfo', passwordController.getUserDetails);
router.put('/updatePassword',passwordController.resetPassword);

module.exports = router;
