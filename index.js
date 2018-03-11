'use strict';
const express = require('express');
const exphbs = require('express-handlebars');

const categories = require('./categories');
const getNewsByCategory = require('./news').getNewsByCategory;
const getWeather = require('./weather').getWeather;

const app = express();
const port = 8080;

module.exports = app;

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(express.static('public'));

app.use((req, res, next) => {
    getWeather(req.query.query, req.query.lat, req.query.lon)
        .then(result => {
            res.locals.weather = result;
        })
        .then(next);
});

app.get('/news/:category', newsController);
app.get('/', indexController);

app.listen(port, function () {
    console.info(`App is started on port ${port}.`);
});

function indexController(req, res) {
    res.render('index', { categories });
}

function newsController(req, res) {
    const category = req.params.category;
    let weather = res.locals.weather;
    getNewsByCategory(category)
        .then((response) => {
            let news = response.body.articles.filter(
                (article) => article.description !== null && article.description.length !== 0
            );
            res.render('news', { news, weather });
        });
}
