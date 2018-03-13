'use strict';
const path = require('path');

const express = require('express');
const hbs = require('hbs');
const app = express();

const weatherMiddleware = require('./middlewares/weather-middleware');
const fetchNews = require('./config/news-fetcher');
const commonData = require('./config/common-data');

const frontPage = require('./mocks/front-page');

const publicDir = path.join(__dirname, 'public');

const viewsDir = path.join(__dirname, 'views');
const partialsDir = path.join(viewsDir, 'partials');

app.set('view engine', 'hbs');
app.set('views', viewsDir);

app.use(express.static(publicDir));
app.use(weatherMiddleware);
app.use(commonData);

app.get('/', (req, res) => {
    res.render('index', frontPage);
});
app.get('/:category', (req, res) => {
    fetchNews(req, res)
        .then(result => {
            res.locals.newsArticles = result;
        })
        .then(() => {
            res.render('category');
        })
        .catch(err => console.error(err));
});

hbs.registerPartials(partialsDir, () => {
    app.listen(8080, () => {
        console.info(`Server started on ${8080}`);
        console.info(`Open http://localhost:${8080}/`);
    });
});

module.exports = app;
