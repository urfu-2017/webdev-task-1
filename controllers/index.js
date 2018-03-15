'use strict';

exports.index = (req, res) => {
    const { weather } = res.locals;
    const { country } = req.query;

    res.render('index', { weather, country });
};
