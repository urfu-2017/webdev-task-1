'use strict';

const News = require('../models/news');

module.exports = (country, category) => News.gettNews(country, category);
