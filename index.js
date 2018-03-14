'use strict';
const path = require('path');

const express = require('express');
const hbs = require('hbs');
const app = express();

const weatherController = require('./controllers/weatherController');
const fetchNews = require('./controllers/newsController');

const frontPage = require('./mocks/front-page');

const publicDir = path.join(__dirname, 'public');
const viewsDir = path.join(__dirname, 'views');
const partialsDir = path.join(viewsDir, 'partials');
const categories = require('./config/common-data');


app.set('view engine', 'hbs');
app.set('views', viewsDir);

app.use(express.static(publicDir));

app.get('/', (req, res) => {
    res.locals.categories = categories;
    weatherController(req)
        .then(result => {
            res.locals.weather = result;
            res.render('index', frontPage);
        });
});
app.get('/:category', (req, res) => {
    weatherController(req)
        .then(result => {
            res.locals.weather = result;
        });
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
