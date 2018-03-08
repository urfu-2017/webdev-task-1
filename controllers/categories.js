'use strict';

const data = require('../data');

exports.list = (req, res) => {

    res.render('categories', {
        title: 'Новости',
        categories: data.categories
    });
};
