'use strict';

const Weather = require('../models/weather');
const News = require('../models/news');

exports.main = async (req, res) => {
    const locals = res.locals;
    const weatherJSON = await Weather.getWeatherJSON(req);
    const title = weatherJSON.title;
    const consolidatedWeather = weatherJSON.consolidated_weather;
    const weather = consolidatedWeather.map(element => {
        return {
            city: title,
            date: element.applicable_date,
            temperature: Math.round(element.the_temp),
            windSpeed: Math.round(element.wind_speed * 0.44704)
        };
    });

    const data = { weather, locals };

    res.render('index', data);
};

exports.news = async (req, res) => {
    const locals = res.locals;
    const newsJSON = await News.getNewsJSON(req);
    const stringified = JSON.stringify(newsJSON, null, 2);

    const data = { stringified, locals };

    res.render('news', data);
};
