'use strict';

const MetaWeather = require('metaweather');
const mw = new MetaWeather;

exports.weather = async (req, res) => {
    let locations = [];

    if (req.query.lat && req.query.lon) {
        const latitude = parseFloat(req.query.lat);
        const longitude = parseFloat(req.query.lon);
        locations = await mw.search().latLon({lat: latitude, lon: longitude});
    }
    else if (req.query.query) {
        locations = await mw.search().query(req.query.query);
    }

    const data = { locations: JSON.stringify(locations.body[0]), ...res.locals };

    res.render('index', data);
};
