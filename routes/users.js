const express = require('express');
const router = express.Router();
const User = require('../models/user');


//User Register Section
router.get("/signup", (req, res) => res.render('signup'));

//User Login Section
router.get("/login", (req, res) => res.render('login'));

router.post('/register', (req, res) => {
    var { firstname, lastname, postcode, email, username, password, password2 } = req.body;

    var errors = req.validationErrors();

    if(errors){
        res.render('register', {
            errors,
        });
    } else {
        var newUser = new User({
            name,
            email,
            username,
            password,
        });
        User.createUser(newUser, function (err, user) {
            if(err) throw err;
            console.log(user);
        });
        req.flash('success_msg', 'You are enow registered and can now login');
        res.redirect('/index')
    }
});

module.exports = router;