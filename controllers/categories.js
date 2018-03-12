'use strict';

const categories = require('../mocks/categories');

exports.list = (req, res) => {
    const data = JSON.parse(JSON.stringify(res.locals));
    data.categories = categories;
    res.render('index', data);
};
