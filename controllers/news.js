'use strict';

const NewsReader = require('../helpers/newsReader');
const Topic = require('../models/topic');

exports.home = (req, res) => {
    let topics = Topic.getAll();

    const data = {
        topics: topics,
        cityForWeather: res.locals.cityForWeather,
        weatherInfoForFiveDays: res.locals.weatherInfoForFiveDays
    };

    res.render('index', data);
};

exports.showNewsForTopic = (req, res) => {
    const topicName = req.params.name;
    const topic = Topic.find(topicName);

    const data = {
        cityForWeather: res.locals.cityForWeather,
        weatherInfoForFiveDays: res.locals.weatherInfoForFiveDays
    };

    if (topic) {
        NewsReader.getAllNews(topic.name, res.locals.queryParams.country)
            .then(allNews => {
                data.allNews = allNews;
                res.render('newsForTopic', data);
            });
    } else {
        res.sendStatus(404);
    }
};
