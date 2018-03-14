'use strict';
const frontPage = require('../mocks/front-info');
const moment = require('moment');

module.exports = (req, res) => {
    let userLang = req.headers['accept-language'];
    moment.locale(userLang);
    res.render('main', frontPage); // this is the important part
};
