'use strict';

const express = require('express');
const router = new express.Router();
const news = require('../controllers/news');

router.get('/', news);

module.exports = router;
