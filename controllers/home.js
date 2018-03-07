'use strict';

const { getWeather } = require('../models/weather');

exports.renderMain = async (req, res) => {
    let weather = await getWeather(req);
    res.render('home', weather);
};
