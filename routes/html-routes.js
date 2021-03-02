//ADRIAN
// const express = require('express');
// const router = express.Router();
const db = require('../models/index');

function initRoutes(app) {
    app.get("/", (req, res) => res.render('index', {
        index
    }));
}

module.exports = initRoutes;