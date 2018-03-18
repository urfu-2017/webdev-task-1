'use strict';
import Weather from '../models/weather';
import news from '../models/news';
import Header from '../models/header';
import moment from 'moment';

let getDate = (date) => {
    return moment(date).format('D MMMM');
};


exports.categories = async (req, res) => {
    await Weather.getWeather('moscow').then(weather =>
        res.render('categories', {
            header: Header.head(),
            weather,
            categories: res.locals
        })
    );

};

exports.news = async (req, res) => {
    let weather;
    await Weather.getWeather('moscow')
        .then(item => {
            weather = item;

            return weather;
        });

    let newsResult;
    await news(req.params.category, 'ru')
        .then(news => {
            for (let i = 0; i < news.articles.length; i++) {
                news.articles[i].publishedAt = getDate(news.articles[i].publishedAt);
            }
            newsResult = news;

            return newsResult;
        });
    res.render('news', {
        header: Header.head(req.param),
        weather,
        news: newsResult
    });
};


