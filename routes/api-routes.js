// Requiring our models and passport as we've configured it
const path = require("path");
const db = require('../models');
const passport = require('../config/passport');
// const unauthorized = require('../config/middleware/unauthorized');
const multer = require('multer');
// const upload = multer({ dest: path.join(__dirname, "../public/data") });
// const storage = multer.memoryStorage();
const upload = multer({ dest: path.join(__dirname, "../public/uploads/") });



module.exports = function (app) {
  app.post('/api/login', passport.authenticate('local'), (req, res) => {
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });
  app.post('/api/signup', upload.single('dogImage'), async (req, res) => {
    // console.log(req.file, req.body);

    console.log(req.file.filename);

    try {
      const t = await db.sequelize.transaction();
      try {
        const newUser = await db.User.create({
          email: req.body.email,
          password: req.body.password,
          firstName: req.body.firstName,
          lastName: req.body.lastName,//Building there that much less go to word one all
          postcode: req.body.postcode
        },
          { transaction: t });

        const newDog = await db.Dog.create({
          breed: req.body.breed,
          dogName: req.body.dogName,
          age: req.body.age,
          sex: req.body.sex,
          desexed: req.body.desexed,
          // allergies: req.body.allergies,
          userText: req.body.userText,
          dogImage: "/uploads/" + req.file.filename,
          UserId: newUser.id
        },
          { transaction: t });

        await t.commit();

        res.redirect('../login', 301);
      } catch (err1) {
        await t.rollback();
        console.log('this is the error1 --->', err1);
        res.status(500).json(err1);
      }
    } catch (err2) {
      console.log('this is the error2 --->', err2);
      res.status(500).json(err2);
    }
  });

  // Route for logging user out
  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  // Route for getting some data about our user to be used client side
  app.get('/api/user_data', (req, res) => {
    if (!req.User) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        name: req.User.name,
        email: req.User.email,
        id: req.User.id
      });
    }
  });

  // app.post('/send', (req, res) => {
  //   const output = `
  //     <img src="./logo/dog_logo.svg" alt="Who let the dogs out? Logo">
  //     <p>You have a new playdate request</p>
  //     <h3>Contact Details</h3>
  //     <ul>  
  //       <li>Name: ${req.body.name}</li>
  //       <li>Email: ${req.body.email}</li>
  //       <li>Dog Name: ${req.body.dogName}</li>
  //       <li>Dog Breed: ${req.body.age}</li>
  //       <li>Dog Name: ${req.body.sex}</li>
  //     </ul>
  //     <h3>Message</h3>
  //     <p>${req.body.message}</p>
  //   `;

  //   // create reusable transporter object using the default SMTP transport
  //   let transporter = nodemailer.createTransport({
  //     host: 'mail.saveasigo.com',
  //     port: 587,
  //     secure: false, // true for 465, false for other ports
  //     auth: {
  //       user: 'wltdo@saveasigo.com', // generated ethereal user
  //       pass: 'wltdo@2021'  // generated ethereal password
  //     },
  //     tls: {
  //       rejectUnauthorized: false
  //     }
  //   });

  //   // setup email data with unicode symbols
  //   let mailOptions = {
  //     from: '"Who Let The Dogs Out Playdate Request" <wltdo@saveasigo.com>', // sender address
  //     to: `${req.body.email}`, // list of receivers
  //     subject: 'Playdate Request', // Subject line
  //     text: 'Hello world?', // plain text body
  //     html: output // html body
  //   };

  //   // send mail with defined transport object
  //   transporter.sendMail(mailOptions, (error, info) => {
  //     if (error) {
  //       return console.log(error);
  //     }
  //     console.log('Message sent: %s', info.messageId);
  //     console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

  //     // res.render('contact', { msg: 'Email has been sent' });
  //   });
  // });

};
