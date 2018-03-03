'use strict';

exports.weather = (req, res) => {
    const data = { req, ...res.locals };

    res.render('index', data);
};
