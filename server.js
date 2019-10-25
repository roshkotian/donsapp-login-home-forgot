const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

// Creating the express server and our port
const app = express();
const port = process.env.PORT || 5000;

// parsing json data
app.use(cors());
app.use(express.json());

// mongoose setup
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

//call posts router
const postsrouter = require("./routes/route");
app.use("/posts", postsrouter);

// calling login information router
const loginRouter = require("./routes/route");
app.use("/login", loginRouter);

// calling forgot Password router
const forgotPasswordRouter = require("./routes/route");
app.use("/password", forgotPasswordRouter);

// configuring port
app.listen(port, () => {
  console.log(`Server is running on port : ${port}`);
});
