'use strict';

const Weather = require('../models/weather');

exports.mainpage = (req, res) => {
    let query = req.query.query ? req.query.query : 'moscow';
    let country = req.query.country ? req.query.country : 'ru';
    const prognoz = Weather.prognoz(query);
    prognoz.then((info) => {
        res.setHeader('content-type', 'text/html');
        res.render('main', {
            title: 'Main Page',
            weather: info,
            city: query,
            country: country
        });
    });
};
