'use strict';

exports.setSettings = (req, res, next, settings) => {
    res.locals.queryParams = req.query;
    res.locals.meta = settings.meta;
    res.locals.title = settings.title;

    res.locals.app = settings;

    next();
};
