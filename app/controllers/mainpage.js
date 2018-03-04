'use strict';

const Weather = require('../models/weather');

exports.mainpage = (req, res) => {
    const prognoz = Weather.prognoz(req.query.query);
    let country = req.query.country ? req.query.country : 'ru';
    prognoz.then((info) => {
        res.setHeader('content-type', 'text/html');
        res.render('main', {
            title: 'Main Page',
            weather: info,
            city: req.query.query,
            country: country
        });
    });
};
