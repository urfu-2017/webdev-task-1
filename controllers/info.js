'use strict';
const newsProxy = require('../proxies/news-proxy');
const weatherProxy = require('../proxies/weather-proxy');

function getQueryParams(query) {
    return {
        query: query.query,
        lon: query.lon,
        lat: query.lat,
        country: query.country
    };
}

exports.getPage = async (req, res) => {
    let { query, lon, lat, country } = getQueryParams(req.query);
    let result;

    if (query) {
        await weatherProxy.query(query)
            .then(weather => {
                result = JSON.stringify(weather);
            });
    } else if (lat && lon) {
        weatherProxy.lattlong(`${lat},${lon}`)
            .then(weather => {
                result = JSON.stringify(weather);
            });
    }

    res.render('index', { result, title: 'title' });
};
