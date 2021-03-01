// ADRIAN
const express = require('express');
const exphbs = require('express-handlebars');

// Sets up the Express App
const app = express();

const PORT = process.env.PORT || 8080;

// Requiring our models for syncing
const db = require('./models');

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Static directory
app.use(express.static('public'));

const htmlRouter = require('./routes/html-routes.js');
const apiRouter = require('./routes/api-routes.js');


// Invoke routes - Routes Still to ber Determined
htmlRouter(app);
apiRouter(app);

// Syncing our sequelize models and then starting our Express app
db.sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
});

