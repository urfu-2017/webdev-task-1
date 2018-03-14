'use strict';
const frontPage = require('../mocks/front-info');

module.exports = (req, res) => {
    res.render('main', frontPage); // this is the important part
};
