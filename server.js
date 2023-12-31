const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const User = require("./models/userModel");
const bcrypt = require("bcrypt");
const passport = require("passport");
const passportSetup = require("./config/passportAuth");
const cookieSession = require("cookie-session");
const initialisePassport = require("./config/passport-localAuth");
const flash = require("express-flash");
const session = require("express-session");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/assets"));

app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");

const port = process.env.PORT || 5000;

app.use(
  session({
    secret: process.env.COOKIE_SESSION_KEY,
    resave: false,
    saveInitialised: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
initialisePassport(passport);

//GET ROUTES
app.get("/", checkAuthentication, (req, res) => {
  res.render("index.ejs");
});

app.get("/auth/signup", checkNotAuthentication, (req, res) => {
  res.render("signup.ejs");
});

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

app.get("/auth/google/redirect", (req, res) => {
  res.redirect("/");
});

//POST ROUTES
app.post(
  "/auth/signup",
  passport.authenticate("local", {
    successRedirect: "/",
    failureMessage: "/auth/signup",
  })
);

//useful functions for middleware
function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/auth/signup");
  }
}

function checkNotAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect("/");
  } else {
    next();
  }
}

//connect to the database and listen to the server
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(port, () => {});
  })
  .catch((error) => {
    console.log(error);
  });
