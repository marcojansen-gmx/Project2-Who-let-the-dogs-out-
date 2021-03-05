// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
const unauthorized = require("../config/middleware/unauthorized");

module.exports = function (app) {
    app.post("/api/login", passport.authenticate("local"), (req, res) => {
        console.log(req.user);
        // Sending back a password, even a hashed password, isn't a good idea
        res.json({
            email: req.user.email,
            id: req.user.id
        });
    });
    app.post("/api/signup", unauthorized, async (req, res) => {

        try {
            const t = await db.sequelize.transaction()
            try {
    
                const newUser = await db.User.create({
                    email: req.body.email,
                    password: req.body.password,
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    postcode: req.body.postcode,
                    username: req.body.username,
                },
                { transaction: t });
        
        
                const newDog = await db.Dog.create({
                            breed: req.body.breed,
                            dogName: req.body.dogName,
                            age: req.body.age,
                            sex: req.body.sex,
                            desexed: req.body.desexed,
                            allergies: req.body.allergies,
                            childfriendly: req.body.childfriendly,
                            usertext: req.body.usertext,
                            dogImage: req.body.dogImage,
                            user_id: newUser.id,
                },
                { transaction: t });
        
                        await t.commit();
    
                        res.redirect(307, "/api/login");
                        
            } catch(err1) {
                await t.rollback();
                console.log('this is the error1 --->', err1);
                res.status(500).json(err1);

            }
        } catch(err2) {
          console.log('this is the error2 --->', err2);
            res.status(500).json(err2);
        }
        



            // .then((User) => {
            //     console.log('USER----> ', User)
            //     return db.Dog.create({
            //         breed: req.body.breed,
            //         dogName: req.body.dogName,
            //         age: req.body.age,
            //         sex: req.body.sex,
            //         desexed: req.body.desexed,
            //         allergies: req.body.allergies,
            //         childfriendly: req.body.childfriendly,
            //         usertext: req.body.usertext,
            //         dogImage: req.body.dogImage,

            //     })
            //         // .then((dog) => {
            //         //     //update user and set the dog id on it)
            //         //     console.log('DOG ---> ', dog)
            //         // })
            // })
            // .then(() => {
            //     res.end();
            //     //res.redirect(307, "/login");
            // })
            // .catch(err => {
            //     console.log('this is the error --->', err);
            //     res.status(500).json(err);
            // });
    });

    // Route for logging user out
    app.get("/logout", (req, res) => {
        req.logout();
        res.redirect("/");
    });

    // Route for getting some data about our user to be used client side
    app.get("/api/user_data", (req, res) => {
        if (!req.user) {
            // The user is not logged in, send back an empty object
            res.json({});
        } else {
            // Otherwise send back the user's email and id
            // Sending back a password, even a hashed password, isn't a good idea
            res.json({
                email: req.user.email,
                id: req.user.id
            });
        }
    });
};