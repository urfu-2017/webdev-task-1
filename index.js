'use strict';
const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

const defaultWoeid = 44418;

module.exports = app;
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use((req, res, next) => {
    getWeather(req.query.query)
        .then(result => {
            console.info(result);
            res.locals.weather = result;
        })
        .then(next);
});

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
    let weather = res.locals.weather;
    getNewsByCategory(category)
        .then((response) => {
            let news = response.body.articles;
            res.render('news', { category, news, weather });
        });
}

const apiKey = 'b471d61e027445de9de7bd155418972e';
const url = 'https://newsapi.org/v2/top-headlines?';
const got = require('got');

function getNewsByCategory(category, country = 'ru') {
    let fullUrl = `${url}category=${category}&country=${country}&apiKey=${apiKey}`;

    return got(fullUrl, { json: true }, response => response);
}

function getWeather(query) {
    return searchLocation(query)
        .then(getWeatherByWoeid);
}

function getWeatherByWoeid(woeid) {
    const weatherUrl = `https://www.metaweather.com/api/location/${woeid}/`;

    return got(weatherUrl, { json: true })
        .then(response => {
            return {
                cityName: response.body.title,
                temp: response.body.consolidated_weather[0].the_temp
            };
        });
}

function searchLocation(query) {
    const weatherUrl = `https://www.metaweather.com/api/location/search/?query=${query}`;

    return got(weatherUrl, { json: true })
        .then(response => response.body[0].woeid)
        .catch(() => defaultWoeid);
}
