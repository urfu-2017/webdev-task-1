'use strict';

const express = require('express');
const hbs = require('hbs');
const url = require('url');
const qs = require('querystring');
const path = require('path');

const helpers = require('handlebars-helpers')();
const toFixed = helpers.toFixed;
hbs.registerHelper('toFixed', toFixed);
hbs.registerHelper('dateFormat', require('handlebars-dateformat'));

const { list } = require('./controllers/categories');
const { renderNews } = require('./controllers/news');
const { getWeatherByRegion, getWeatherByCoords } = require('./utils/weather');

const app = express();
const viewsDir = path.join(__dirname, 'views');
const partialsDir = path.join(viewsDir, 'partials');
const publicDir = path.join(__dirname, 'public');
app.set('view engine', 'hbs');
app.set('views', viewsDir);

app.use(express.static(publicDir));

app.use((req, res, next) => {
    const parsedUrl = url.parse(req.url);
    const query = qs.parse(parsedUrl.query);
    let weather;
    if (Object.keys(query).includes('query')) {
        weather = getWeatherByRegion(query.query);
    } else if (Object.keys(query).includes('lat') && Object.keys(query).includes('lon')) {
        weather = getWeatherByCoords({ lat: query.lat, lon: query.lon });
    } else {
        weather = getWeatherByRegion('moscow');
    }
    weather.then(data => {
        res.locals.weather = data;
        next();
    });
});

app.get('/', list);
app.get('/news/:category', renderNews);

hbs.registerPartials(partialsDir, () => {
    app.listen(8080, () => {
        console.info('Listening on http://localhost:8080');
    });
});

module.exports = app;
