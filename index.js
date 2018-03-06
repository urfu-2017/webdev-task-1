'use strict';
const path = require('path');

const express = require('express');
const hbs = require('hbs');
const app = express();

const weatherMiddleware = require('./middlewares/weather-middleware');
const newsMiddleware = require('./middlewares/news-middleware');
const commonData = require('./middlewares/common-data');

const frontPage = require('./mocks/front-page');

const publicDir = path.join(__dirname, 'public');

// Подключаем шаблонизатор
const viewsDir = path.join(__dirname, 'views');
const partialsDir = path.join(viewsDir, 'partials');

app.set('view engine', 'hbs');
app.set('views', viewsDir);

app.use(express.static(publicDir));
app.use(weatherMiddleware);
app.use(newsMiddleware);
app.use(commonData);

app.get('/', (req, res) => {
    res.render('index', frontPage);
});
app.get('/:category', (req, res) => {
    res.locals.category = req.path.substr(1, req.path.indexOf('&') - 1) || req.path.substr(1);
    res.render('category');
});

hbs.registerPartials(partialsDir, () => {
    app.listen(8080, () => {
        console.info(`Server started on ${8080}`);
        console.info(`Open http://localhost:${8080}/`);
    });
});

module.exports = app;
