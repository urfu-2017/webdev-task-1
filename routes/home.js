'use strict';

const express = require('express');
const router = new express.Router();
const home = require('../controllers/home');

router.get('/', home);

module.exports = router;
