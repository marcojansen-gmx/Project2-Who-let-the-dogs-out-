//ADRIAN
const express = require('express');
const router = express.Router();
const db = require('../models');

router.get("/", (req, res) => res.send('INDEX PAGE'));

module.exports = router;

