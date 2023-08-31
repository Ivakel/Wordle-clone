const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const User = require("./models/userModel");

const app = express();
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/assets"));

app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");

const port = process.env.PORT;

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/auth/signup", (req, res) => {
  res.render("signup.ejs");
});

//starting the server and connecting to the database
mongoose.set("strictQuery", false);
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@tictactoeapi.e1ttns0.mongodb.net/TicTacToeAPI?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
