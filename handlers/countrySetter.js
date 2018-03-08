'use strict'

const moment = require('moment');

const NewsService = require("../dataAccess/newsService");

exports.countrySetter = (req, res, next) => {
    const country = req.query.country;
    if (country) {
        NewsService.setCountry(country);
        res.locals.country = country;
    }
    next();
}