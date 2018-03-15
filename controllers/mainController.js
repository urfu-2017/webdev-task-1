'use strict';
const frontPage = require('../mocks/front-info');
const weatherModels = require('../models/weather.js');

module.exports = async (req, res) => {
    const weather = await weatherModels.getWeather(req.query);
    const info = weather.info;
    Object.assign(frontPage, {
        info: info,
        weather: weather
    });
    console.info(info);
    res.render('main', frontPage); // this is the important part

};
