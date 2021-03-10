// Requiring path to so we can use relative routes to our HTML files
const { response } = require("express");
const path = require("path");

// const db = require("./../models");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");
const unauthorized = require("../config/middleware/unauthorized");
const db = require("../models");

module.exports = function (app) {

  app.get("/", unauthorized, (req, res) => {
    res.render("index");
  });



  app.get("/signup", (req, res) => {
    res.render("signup", {
      scripts: [
        "/js/signup.js"
      ]
    });
  });

  app.get("/login", (req, res) => {
    res.render("login", {
      scripts: [
        "/js/login.js"
      ]
    });
  });

  // to be used for handlebars
  app.get('/playdate', (req, res) => {
    // const query = {};
    db.Dog.findAll({
      include: db.User,
    }).then((dbDog) => {
      console.log(dbDog);
      res.json(dbDog);
    });
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page

  app.get("/playdates", isAuthenticated, async (req, res) => {

    const dogs = await db.Dog.findAll({
      where: {
        UserId: req.user.id
      }
    }, { include: db.User });



    let randomDog = {};
    console.log("empty" + randomDog);
    if (dogs.length > 0) {
      const randomIndex = Math.floor(Math.random() * dogs.length);
      randomDog = dogs[randomIndex].dataValues;
      console.log("dogLuca" + randomDog);
    }


    console.log(dogs);

    res.render("playdate", {
      user: randomDog.User,
      dog: randomDog,

      scripts: [
        "/js/hammer.js",
        "/js/swipe.js",

      ]
    });

  });
};

