'use strict';

const utils = require('../utils');

module.exports = ({ Weather, News }, data) => (req, res) => {
    const category = utils.findCategoryName(data.categories, req.params.category);
    new Weather(req.query).find()
        .then(weather => new News(req.query.country, req.params.category).find()
            .then(news => {
                return res.render('category', { weather, news, category });
            }));
};
