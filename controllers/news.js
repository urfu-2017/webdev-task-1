'use strict';

const getNewsByCategory = require('../repository/newsRepository');

exports.newsList = (req, res) => {
    var categoryName = req.params.name;
    getNewsByCategory(categoryName)
        .then(news => {
            // console.log(news);
            const data = { news, ...res.locals };

            res.render('news', data);
        });
};
