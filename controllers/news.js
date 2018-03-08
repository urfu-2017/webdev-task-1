'use strict';


const data = require('../data');
const models = require('../models/news');

exports.index = (req, res) => {

    models.getNews.findByCategory(req.params.category).then((apiResponse) => {
        res.render('news', {
            title: data.categories[req.params.category].title,
            articles: apiResponse.articles,
            dateOptions: {
                lang: 'ru'
            }
        });
    });
};
