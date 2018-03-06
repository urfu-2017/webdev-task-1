'use strict';

const { getWeatherData } = require('../repository/weatherRepository');

exports.newsList = (req, res) => {
    getWeatherData()
        .then(data => {
            res.render('news', data);
        });
};
