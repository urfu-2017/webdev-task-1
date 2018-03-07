'use strict';
const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

module.exports = app;
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.get('/news/:category', newsController);
app.get('/', indexController);

app.listen(8080, function () {
    console.info('App is started on port 8080.');
});

const categories = [
    { name: 'business' },
    { name: 'entertainment' },
    { name: 'general' },
    { name: 'health' },
    { name: 'science' },
    { name: 'sports' },
    { name: 'technology' }
];

function indexController(req, res) {
    res.render('index', { categories });
}

function newsController(req, res) {
    const category = req.params.category;
    getNewsByCategory(category)
        .then((response) => {
            let news = response.body.articles;
            console.info(news);
            res.render('news', { category, news });
        });
}

const apiKey = 'b471d61e027445de9de7bd155418972e';
const url = 'https://newsapi.org/v2/top-headlines?';
const got = require('got');

function getNewsByCategory(category, country = 'ru') {
    let fullUrl = `${url}category=${category}&country=${country}&apiKey=${apiKey}`;

    return got(fullUrl, { json: true }, response => response);
}
