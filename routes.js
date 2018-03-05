'use strict';

const { newspage } = require('./app/controllers/newspage');
const { mainpage } = require('./app/controllers/mainpage');

module.exports = app => {
    app.get('/', mainpage);
    app.get('/news/:category', newspage);

    app.all('*', (req, res) => {
        res.sendStatus(404);
    });
};
