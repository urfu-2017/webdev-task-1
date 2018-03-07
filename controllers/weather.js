'use strict';

const Weather = require('../models/weather');

module.exports = query => Weather.getWeather(query);
