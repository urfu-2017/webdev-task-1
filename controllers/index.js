'use strict';

const config = require('../config');

exports.main = async (req, res) => {
    res.locals.categories = config.categories;

    res.render('index', res.locals);
};
