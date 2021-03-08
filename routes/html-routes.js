// Requiring path to so we can use relative routes to our HTML files
const path = require('path');

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require('../config/middleware/isAuthenticated');
const unauthorized = require('../config/middleware/unauthorized');

module.exports = function (app) {
  
  app.get("/", unauthorized, (req, res) => {
    res.render("index");
  });

  

  app.get("/signup", (req, res) => {
    res.render("signup");
  });

  app.get("/login", (req, res) => {
    res.render("login");
  });

  // to be used for handlebars
  // app.get("/playdate", isAuthenticated, (req, res) => {
  //   res.render("playdate");
  // });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page

  app.get("/playdates", isAuthenticated, (req, res) => {

    res.render("playdate", {
      scripts: [
        "/js/hammer.js",
        "/js/swipe.js",

      ]
    });

  });
};