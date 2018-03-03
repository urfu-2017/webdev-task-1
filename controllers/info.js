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
    let { query, lon, lat } = getQueryParams(req.query);
    let weatherQueryResult;

    if (query) {
        await weatherProxy.query(query)
            .then(weather => {
                weatherQueryResult = weather;
            });
    } else if (lat && lon) {
        weatherProxy.lattlong(`${lat},${lon}`)
            .then(weather => {
                weatherQueryResult = weather;
            });
    }

    res.render('index', { weatherQueryResult, title: 'title' });
};

exports.news = async (req, res) => {
    let { country } = getQueryParams(req.query);

    let result;
    if (country) {
        await newsProxy(req.params.category, country).then(news => {
            result = news;
        });
    }

    // res.render(result);
};
