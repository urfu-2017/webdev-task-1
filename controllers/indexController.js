'use strict';

const categories = require('../models/categories');

module.exports.indexController = function indexController(req, res) {
    res.render('index', { categories });
};
