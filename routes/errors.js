'use strict';

const express = require('express');
const router = new express.Router();
const errors = require('../controllers/errors');

router.all('*', errors.error404);

module.exports = router;
