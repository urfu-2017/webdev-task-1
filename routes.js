'use strict';

const { getPage: info, news } = require('./controllers/info');

module.exports = app => {
    app.get('/', info);

    app.get('/news/:category([a-z]+)', news);
};
