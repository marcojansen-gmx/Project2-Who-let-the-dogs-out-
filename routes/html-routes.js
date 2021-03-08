// Requiring path to so we can use relative routes to our HTML files
const path = require('path');

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require('../config/middleware/isAuthenticated');
const unauthorized = require('../config/middleware/unauthorized');

module.exports = function (app) {
  
  app.get("/", unauthorized, (req, res) => {
    res.render("index", {
      showNav: false
    });
  });

  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../", "public", "index.html"));
  });

  app.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, "../", "public", "html", "signup.html"));
  });

  app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "../", "public", "html", "login.html"));
  });

  // to be used for handlebars
  // app.get("/playdate", isAuthenticated, (req, res) => {
  //   res.render("playdate");
  // });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page

  app.get("/playdates", isAuthenticated, (req, res) => {

s
  // <script type="text/javascript" src="/js/swipe.js"></script>

    res.sendFile(path.join(__dirname, "../", "public", "html", "playdate.html"));
  });
};