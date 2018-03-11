'use strict';
const generic = require('../data/generic');
const header = require('../data/header');
const footer = require('../data/footer');

exports.news = (req, res) => {
    const data = {};
    Object.assign(data, generic);
    Object.assign(data, header);
    data.toHomeVisible = true;
    Object.assign(data, footer);

    res.render('news', data);
};
