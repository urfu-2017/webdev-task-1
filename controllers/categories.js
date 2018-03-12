'use strict';

const categories = require('../mocks/categories');

exports.list = (req, res) => {
    let data = JSON.parse(JSON.stringify(res.locals));
    data.categories = categories;
    res.render('index', data);
};
