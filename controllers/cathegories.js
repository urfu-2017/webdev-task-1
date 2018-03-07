'use strict';

const cathegories = require('../mocks/cathegories');
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('f8c7968376984c3db60b4759fa20cfe4');

// Каждый контроллер (controller) обычно экспортирует
// несколько функций-действий (actions)

exports.listCathegories = (req, res) => {
    // Объединяем данные специфичные для контроллера с общими данными
    const data = { cathegories };
    res.render('index', data);
};

exports.listNews = (req, res) => {
    const flag = 1;
    let data = { cathegories, flag };
    let country = req.query.country || 'us';
    let options = {
        category: req.params.name,
        language: 'en',
        country: country
    };
    newsapi.v2.topHeadlines(options)
        .then(response => {
            data.news = response.articles.slice(0, 5);
            res.render('cathegory', data);
        });
};
