'use strict';

const url = require('url');

const newsProxy = require('../proxies/news-proxy');
const weatherProxy = require('../proxies/weather-proxy');

async function queryWeather(query, lat, lon) {
    let weatherQueryResult;

    if (query) {
        await weatherProxy.query(query)
            .then(weather => {
                weatherQueryResult = weather;
            });
    } else if (lat && lon) {
        await weatherProxy.lattlong(`${lat},${lon}`)
            .then(weather => {
                weatherQueryResult = weather;
            });
    }

    return weatherQueryResult;
}

async function queryNews(country, req) {
    let newsQueryResult;

    if (country) {
        await newsProxy(req.params.category, country)
            .then(news => {
                newsQueryResult = news;
            });
    }

    return newsQueryResult;
}

function getSearchString(req) {
    return url.parse(req.originalUrl).search;
}

exports.info = async (req, res) => {
    let query = req.query.query;
    let lon = req.query.lon;
    let lat = req.query.lat;

    let weatherQueryResult = await queryWeather(query, lat, lon);

    res.render('index', {
        weatherQueryResult,
        title: 'Погода и новости',
        search: getSearchString(req)
    });
};

exports.news = async (req, res) => {
    let query = req.query.query;
    let lon = req.query.lon;
    let lat = req.query.lat;
    let country = req.query.country;

    let newsQueryResult = await queryNews(country, req);
    let weatherQueryResult = await queryWeather(query, lat, lon);

    res.render('news_page', {
        search: getSearchString(req),
        returnToMain: true,
        newsQueryResult,
        weatherQueryResult,
        title: 'Новости и погода'
    });
};
