'use strict';

const { error404 } = require('./controllers/errors');
const { news } = require('./controllers/news');
const { index } = require('./controllers/index');
const initData = require('./content/initData.json');

module.exports = app => {
    app.use((req, res, next) => {
        res.locals.meta = {
            charset: 'utf-8'
        };
        res.locals = Object.assign(initData, res.locals);
        next();
    });
    app.get('/', index);
    app.get('/:category', news);
    app.all('*', error404);
};
