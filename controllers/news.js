'use strict'

const News = require('../models/News');
const { getNewsByCategory } = require('../repository/newsRepository');
const storage = [];

exports.newsList = (req, res) => {
    var categoryName = req.params.name;
    console.log(categoryName);
    getNewsByCategory(categoryName)
        .then(news => {
            // renderNews(news);
            const data = { news, ...res.locals };
            console.log(data);
            res.render('news', data);
        });
}