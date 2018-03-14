'use strict';

const getNewsByCategory = require('../repository/newsRepository');

exports.getList = (req, res) => {
    const categoryName = req.params.name;
    const country = req.query.country;
    getNewsByCategory(categoryName, country)
        .then(news => {
            const data = { news, ...res.locals };

            res.render('news', data);
        });
};
