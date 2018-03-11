'use strict';

const url = require('url');

const newsProxy = require('../proxies/news-proxy');
const weatherProxy = require('../proxies/weather-proxy');

function queryWeather(query, lat, lon) {
    if (query) {
        return weatherProxy.query(query);
    } else if (lat && lon) {
        return weatherProxy.lattlong(`${lat},${lon}`);
    }
}

function queryNews(country, req) {
    if (country) {
        return newsProxy(req.params.category, country);
    }
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
