'use strict';

import data from '../data';
import config from '../config';
import { WeatherManager } from '../models/weather';

exports.list = async (req, res) => {
    res.render('categories', {
        title: 'Илон слишком занят',
        categories: data.categories,
        weatherData: await WeatherManager.getWeatherData(req.params),
        dateOptions: {
            lang: config.language
        }
    });
};
