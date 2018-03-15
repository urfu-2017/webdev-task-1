'use strict';
const News = require('../models/newsModels.js');

module.exports = async (req, res) => {
    const info = res.locals.weather.info;

    let article = await News.getNews(req);
    Object.assign(article, {
        info: info
    });
    res.render('news', article);

};

