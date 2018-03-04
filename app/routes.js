'use strict';

const { newspage } = require('./controllers/newspage');
const { mainpage } = require('./controllers/mainpage');

module.exports = app => {
    app.get('/', mainpage);
    app.get('/news/:category', newspage);

    app.all('*', (req, res) => {
        res.sendStatus(404);
    });
};
