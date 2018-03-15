'use strict';
const weatherModels = require('../models/weather.js');
const Front = require('../models/frontPage.js');

module.exports = async (req, res) => {

    const weather = await weatherModels.getWeather(req.query);
    const info = weather.info;
    const frontPage = Front.fetch();
    console.info(frontPage);
    Object.assign(frontPage, {
        info: info,
        weather: weather
    });
    res.render('main', frontPage); // this is the important part

};
