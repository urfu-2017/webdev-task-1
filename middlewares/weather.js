'use strict';

const moment = require('moment');
const getWeather = require('../models/weather');

exports.loader = (req, res, next) => {
    getWeather(req.query)
        .then(weather => {
            const today = weather.daily[0];
            const days = weather.daily.slice(1).map(day => ({
                'temp': Math.round(day.the_temp),
                'wind': Math.round(day.wind_speed),
                'date': moment(day.applicable_date).format('D MMMM')
            }));
            res.locals.weather = {
                'temp': Math.round(today.the_temp),
                'wind': Math.round(today.wind_speed),
                'stateAbbr': today.weather_state_abbr,
                'city': weather.city,
                'days': days
            };
        })
        .then(next);
};
