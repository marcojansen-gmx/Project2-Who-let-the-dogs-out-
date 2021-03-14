// Requiring our models and passport as we've configured it
const path = require("path");
const db = require('../models');
const passport = require('../config/passport');
// const unauthorized = require('../config/middleware/unauthorized');
const multer = require('multer');
// const upload = multer({ dest: path.join(__dirname, "../public/data") });
// const storage = multer.memoryStorage();
const upload = multer({ dest: path.join(__dirname, "../public/uploads/") });
const nodemailer = require('nodemailer');
const hbs = require("nodemailer-express-handlebars");


async function sendEmail(to, subject, html) {
  return new Promise((resolve, reject) => {
    var smtpTransport = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "wltdo2021@gmail.com",
        pass: "WhoLetTheDogsOut@2021"
      }
    });

    var mailOptions = {
      from: 'wltdo@saveasigo.com',
      to: to,
      subject: subject,
      html: html
    }
    smtpTransport.sendMail(mailOptions, function (error, response) {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        resolve(true);
      }
    });
  });
}

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

        res.end();
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
    console.log("Logout Request");
    req.logout();
    req.session.destroy();
    res.redirect('/?logout');
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

  app.post('/api/confirmationEmail', async (req, res) => {
    console.log('confirmationEmail');
    console.log(req);
    console.log(req.body);

    const selectedDogId = req.body.dogId;
    const selectedUserDog = await db.Dog.findOne({
      include: db.User,
      where: {
        id: selectedDogId
      }
    });

    console.log(selectedUserDog.User);
    let dogOwner = selectedUserDog.User.dataValues;
    let dogOwnerEmail = dogOwner.email;
    console.log(dogOwnerEmail);

    const currentUserDog = await db.Dog.findOne({
      where: {
        UserId: req.user.id
      }
    });

    let dogSex = 'Female';
    if (currentUserDog.sex)
      dogSex = 'Male';

    const output = `
    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAC0CAMAAAAZ4eHdAAAAIVBMVEUAAAD///9Xks5/f39AQEC/v7+ryOaAgIDV5POBrdr///8CEcVIAAAAC3RSTlP/////////////AEpPAfIAAAAJcEhZcwAACxMAAAsTAQCanBgAAAX3aVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA2LjAtYzAwNiA3OS4xNjQ3NTMsIDIwMjEvMDIvMTUtMTE6NTI6MTMgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMi4zIChNYWNpbnRvc2gpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyMS0wMy0wOFQxMDo0ODo0OSswODowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjEtMDMtMTNUMTg6NDY6NDYrMDg6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjEtMDMtMTNUMTg6NDY6NDYrMDg6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIyIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MjIwNTc2MTItMzBhNC00NTNkLTg1Y2MtOWNmZGFiYWU3MTJkIiB4bXBNTTpEb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6YmEzN2ZjMWQtZjQ2MS0yYjRmLTg0N2EtMDJjYTBiN2M1NTg5IiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6YWY3ZGMwNmYtNjU3Ny00ZmQ5LWI0ZWUtNWVhZTkzODE5OTg5Ij4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDphZjdkYzA2Zi02NTc3LTRmZDktYjRlZS01ZWFlOTM4MTk5ODkiIHN0RXZ0OndoZW49IjIwMjEtMDMtMDhUMTA6NDg6NDkrMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMi4zIChNYWNpbnRvc2gpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDoyMjA1NzYxMi0zMGE0LTQ1M2QtODVjYy05Y2ZkYWJhZTcxMmQiIHN0RXZ0OndoZW49IjIwMjEtMDMtMTNUMTg6NDY6NDYrMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMi4zIChNYWNpbnRvc2gpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PpuS9oMAAAlzSURBVHic7V3pkrMqED3cyWLx/s9KGcd83B+C7EobBTLFqZqJC+uxaZoGkXF05OK/2gX4JnSyCOhkEdDJIqCTRUAni4Bb7QIAIzDULkMe6kvWqP6+ANXJGq3/raM6Wd+EThYB1cl61C4AAdXJWgrwHd1hfdPhO3gC0IBkfRM6WQR0sgjoZBHQySLge8ga6w+JvoassYEB5NeQ1QK+hqwWbNf6FnwuGmDraySrBTRFlqhdgB00RVbrOJusz6yhxkWrhIIXwP1Oi9DmchV2fbGUuOxnJJZQIitwDVwvWS/1mykuAmCQF5bnA1yv4N/rkZg2AwowQICxq0t0GOV6Q8YwbyvwGwC0S1U5sp4MYAwiTZfAW7YsVihFFmOT+k3SNeEumxYrlCHLFheGBF0zflvn6jyycq1RFqdL2JxanWF1H5aNs0yHERgz/QIMj5dwTCmBlGIfs1MtgZPIGoF8tjAxSHdo03oDXFBrIM0YY09z4t2lGfDFRpQ1nX8TgOcECa8btFRWjqyWG32fJFnD+o8AuZgUjPnjmzZHhuc1w+H2THCVrLklTw5bxIFhQbfOac3wSEIyptlls4JVRMGnReWm7x3vDV8FW209t7IE2JvZp4fw3g9yGgqQlXzwDJ8bWEUd0UUkK0dqjinPbQ/Z2ShBVly0PJk61pzmZPJXoIzOiotW3FygiJgoO04qQhaPssXwow9tE54gYgKsqAVbdZJ1Vhx6VOYqbVF6aqPM2JALGWkvTK51Ze7lHIglVkkLtpBkJRoic381ckRr4arsnFk5r8NtjlyM6WcJiD15UWJVeGhUSmdx/GaGlMCebE2ijruwwPS9QtDNxydz1oaVLJhxQpcec5cjC744RH0OthaKFW2asUYr7p8oSJZqW1oogHtMi7k62y2dMPGXkH+YrMw5iq0ezo5U3vFV1CjlWGYqGGMb8/Rbt6zjCk7CshY8v2VZRltUatRwqBYe7jzi1mmIPb6qOJ+Ljw05ZKbZHbJl1lrWcdSXH0hzDpn3FnnA1tp7VprUqOF14HhltsXEaa0JoKKmg0HmeMXmtKJ9pVHJn8XzVBeLHhqnYWFcRNb+ai2e5V9ZKHLNMolnIvTVqOcpzbO5Qvv1J2iExd5xrehWfhzz3fkDyrHcO64XkTXkrKjJa4ke4tq9DFtVJywyRz8uKq4oq/sKHb0lyvi2SGVUfuX3DWMtURrkSNEAlHIyVzJKDab55kyrSuA5rYcKDRikQHXJAh5O9ybl+jYGwBi768tmgrHiC5zVyXKmFCWeboOaGcPiDtR01WSrPllW9yaxSpUBY5CSMabpqmW+owmyHns9ItMzQRIApnqi1QBZa0NMvhW2rP3WwlWvIbZAFhaZ2XqDblkuwwB5q/juSiNk5XpdGH4lqm1p0ApZ867ekgDwYPdNCbwWjZC1v3poYWvCzCBriVYjZC3I9czX2smgEbJU9bfGgsyySyuhEbLUpOrvNlu1UXuzsZcaRSuh2VvxVncrkeJeh4tUc5FqVHfRfBNa0VlfgU4WAZ0sAjpZBHSyCOhkEdDJIqCTRUAni4BOFgGdLAI8r4PZTNR/5S9nq9WjO9cKyl6uH2+Pm71hahDMG0ibEgvrQNdlL5ecMNE4AM+JLH6eAgfyCHLLSSDy8CLNUOh/QthnON/5JYS3+99eHd4q+FE/jwgOSMirv1qf8ckX4wSAn6d7/kFqh2TLyjOVwKYyyFPwpD2303ib0n7CFeefx99KIHkrIVkfymsK5plxk/APbamHSuOYbH2GLMm6tlzFlsW4e62nxSBZXaLOtpt0Rse0dqlqn/OXIYYL3QP66ZskRV7/awUSi8hyv6wGzhWdnVaoL7+ULuJkpVhXXSO3wmxYLa+3vq/Te1uNJxZtCSeMzbJjFHllmGYdi6/Rs5vFe03uLW7xrmynGQZP2i/nTvYqpP3oMyAAszUWQRNHX1CPxbcJvEWuRROiD3d4eLYphqoo+d3pmkGiwEGOpgzOk802kC0h2gtOJGtN7rWc7SXPH1g++LEE5Hw3wsZZIgJ3Tz/BUrxkKT2yLG2xIrp0an+Xq0VZEveZc9trlnZPnW7Ff63/kogVPCZZnulo9Q1u7ts96RsA32pMpyKo+SbRb2DPZIkVPNkMM5bi6dZ+xBiOw69hPLqtjnSMdywBgd1mT0KSrBjv5JxP8hEcghrTHKUrFu/6VTQfPtswei6FXOT6ruLaK7SZU2TxdfS2n1sQYjU9uX1CRzT6FM0zlgmHyMs+1Vv5Uf1mSKlZ4hEL4X6kYuPzMTl5+NFn736iUEKItSmmwqTSMAm4ON8HL9wCXLMeK/VMndz82romdKaz1MZRsnaH7qmnSkPC2uKxMmRyIfIEK4YNsvap3+jslC4UudMQ0dxzGvASJG84ZZvcfM0kv0y5kvWrslkHYVvDQs75w3CU5ioYmIuIaCQFyy7DPQwZIyJRFO+yPe3gICDLsi/sNO72NW7ftULpAaCTFA+CRTPQYa3sb9EwTpDwRlBAd+ioCvdj3wwEDojLanxN6er+2vUHBY6ypOfsJIjQC62ytHq/U+z2sO5/aAGuYuk0skL8oen7RawmXMbVX5Isf0bifPwpsq5sgsBfI+ti/CGddT06WQR0sgjoZBHQySKgk0VAJ4uAThYBnSwCOlkEnDxvOM8bn7Ed9z5xO8+4EQsUZjjPKo3d7Mg4d2yotgsdzNG6geiAccD6p8MP+h9GO6hOaoAdX58Pmoh/kxNhcJL0sjoDlzTD9Barg3NrHP6Zw5zoXjbJJTo6sSE3qTycPn1vhEF/W3rc+ML0NACDIep2s6gaRkgWi28Ra28ROPgiezqqKnhVo6dfuXW35NgihMEKZW25cg09Ls4na5WMcdzZTntU7YQ5wTIqbWs3Kxczk3ERc6c3Q6WBSbeGEyo3AGxR7rC6iHNJu2LJ0eD8BNc1xrgmH+2DGIuDE1HpcHNlCA5OwwUKnhY0Ssd2h2j6OCtyAZV15WK2Q83AkZBtlTeMxvCcl5+LtXy93lBVzHmXYVamqBUqFlXFMcZroXW+Ncga7X7yP5+OwbL/EwnoQoda8dovDvSpMAK614GAThYBnSwCOlkEdLII6GQR0MkioJNFQCeLgE4WAbU3oo7i9b5yseNx/Jy0zcyZEBL4rfYt0Q002AyXNcd7m53XQINkKVzz7t1HaJesBtHJIqBdshrsDxsky3lNtSl0tzIBDUpWu+hkEdDJIqCTRUAni4D/Aa5WZ4f3wdlyAAAAAElFTkSuQmCC" />    
<p>You have a new doggy playdate request</p>
    <h3>Details of Owner & his Dog</h3>
    <ul>  
      <li>Owner Name: ${req.user.firstName} ${req.user.lastName}</li>
      <li>Email: ${req.user.email}</li>
      <li>Dog Name: ${currentUserDog.dogName}</li>
      <li>Dog Breed: ${currentUserDog.breed}</li>
      <li>Dog Age: ${currentUserDog.age}</li>
      <li>Dog Sex: ${dogSex}</li>
    </ul>
    <h3>Message</h3>
    <p>${currentUserDog.userText}</p>
  `;

    sendEmail(dogOwnerEmail, 'Playdate request', output).then(m => {
      console.log('Email sent');
      res.json({
        message: 'Email sent'
      });
    }).catch(e => {
      console.log('ERROR');
    });
  });
};
