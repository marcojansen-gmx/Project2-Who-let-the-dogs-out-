// ADRIAN
const express = require('express');
const exphbs = require('express-handlebars');

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 8081;

const htmlRouter = require('./routes/html-routes.js');
const apiRouter = require('./routes/api-routes.js');

const passport = require('passport');

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Requiring our models for syncing
const db = require('./models');

// app.use("/api", apiRouter);
// app.use("/html", htmlRouter);
// app.use("/users", userRouter);
// Static directory
app.use(express.static('public'));

app.use(passport.initialize());
app.use(passport.session());

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Invoke routes - Routes Still to be Determined
htmlRouter(app);
apiRouter(app);

// Syncing our sequelize models and then starting our Express app
db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log('Listening on port %s. Visit http://localhost:%s/ in your browser.', PORT, PORT);
  });
});
