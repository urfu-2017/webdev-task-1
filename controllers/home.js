'use strict';

exports.renderMain = async (req, res) => {
    let container = {};
    Object.assign(container, req.weather);
    Object.assign(container, { newsItems: req.newsItems });
    res.render('home', container);
};
