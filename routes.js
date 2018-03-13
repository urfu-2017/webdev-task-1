'use strict';

const express = require('express');

const { main } = require('./controllers/main');
const { news } = require('./controllers/news');
const { error404 } = require('./controllers/errors');
const { newsCategories } = require('./config/default.json');

const router = new express.Router();
const newsCategoriesRegexp = newsCategories
    .map(category => category.originalName)
    .join('|');

router.get('/', main);
router.get(`/news/:category(${newsCategoriesRegexp})`, news);
router.all('*', error404);

module.exports = router;
