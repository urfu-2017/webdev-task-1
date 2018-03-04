'use strict';

module.exports = ({ Weather }, { categories }) => (req, res) => {
    const query = req.url.slice(1);
    new Weather(req.query).find()
        .then(weather => res.render('main', { categories, weather, query }));
};
