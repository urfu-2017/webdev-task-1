'use strict';
const frontPage = require('../mocks/front-info');

module.exports = (req, res) => {
    const info = res.locals.weather.info;
    Object.assign(frontPage, {
        info: info
    });
    res.render('main', frontPage); // this is the important part
};
