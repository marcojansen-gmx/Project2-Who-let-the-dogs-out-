// Requiring path to so we can use relative routes to our HTML files
const path = require('path');

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require('../config/middleware/isAuthenticated');
const unauthorized = require('../config/middleware/unauthorized');


module.exports = function (app) {
  //   app.get('/', (req, res) => {
  //     // If the User already has an account send them to the members page
  //     if (req.User) {
  //       res.redirect('/members');
  //     }
  //     res.sendFile(path.join(__dirname, '../public/signup.html'));
  //   });

  app.get('/signup', unauthorized, (req, res) => {
    res.render('signup');
  });

  app.get('/login', unauthorized, (req, res) => {
    res.render('login');
  });

  app.get('/', unauthorized, (req, res) => {
    res.render('index');
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get('/playdates', isAuthenticated, (req, res) => {
    res.render('playdates');
  });
};
