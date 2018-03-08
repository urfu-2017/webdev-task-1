'use strict';

const Weather = require('../models/weather');

module.exports = async (req, res, next) => {
    let location;
    if (req.query.query) {
        location = await Weather.loadLocationByQuery(req.query.query);
    } else if (req.query.lon && req.query.lat) {
        location = await Weather.loadLocationByCoords(req.query.lat, req.query.lon);
    } else {
        location = {
            title: 'London',
            woeid: '44418'
        };
    }

    res.locals.consolidatedWeather = await Weather.loadConsolidated(location);

    next();
};
