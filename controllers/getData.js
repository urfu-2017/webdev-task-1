'use strict';

const getNews = require('../models/getNews');

function render(res, hbsFileName, news) {
    const data = { news };
    Object.assign(data, res.locals);
    res.render(hbsFileName, data);
}

exports.index = async (req, res) => render(res, 'index');

exports.news = async (req, res) => {
    const category = req.params.name;
    const news = await getNews(category);
    render(res, 'page-with-news', news);
};
