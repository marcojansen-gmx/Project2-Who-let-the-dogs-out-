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
    })

    const dog = dogs[0] || [];

    console.log(dogs);

    res.render("playdate", {
      user: req.user,
      dog: dog.dataValues,

      scripts: [
        "/js/hammer.js",
        "/js/swipe.js",

      ]
    });

  });
};

