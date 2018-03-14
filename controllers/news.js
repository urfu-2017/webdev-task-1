'use strict';

import models from '../models/news';
import data from '../data';
import config from '../config';
import { WeatherManager } from '../models/weather';

exports.index = async (req, res) => {
    if (!data.categories[req.params.category]) {
        res.status(404);

        return;
    }
    const apiResponse = await models.NewsManager.findByCategory(req.params.category);
    res.render('news', {
        title: data.categories[req.params.category].title,
        weatherData: await WeatherManager.getWeatherData(req.params),
        articles: apiResponse.articles,
        dateOptions: {
            lang: config.language
        }
    });
};
