'use strict';
import Weather from '../models/weather';
import getNews from '../models/news';
import Header from '../models/header';
import moment from 'moment';

let getDate = (date) => {
    return moment(date).format('D MMMM');
};


exports.categories = async (req, res) => {
    await Weather.getWeather('moscow').then(weather =>
        res.render('categories', {
            header: Header.getHeader(),
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
    await getNews(req.params.category)
        .then(news => {
            for (let i = 0; i < news.articles.length; i++) {
                news.articles[i].publishedAt = getDate(news.articles[i].publishedAt);
            }
            newsResult = news;

            return newsResult;
        });
    res.render('news', {
        header: Header.getHeader(req.param),
        weather,
        news: newsResult
    });
};


