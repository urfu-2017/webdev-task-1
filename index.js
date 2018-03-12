'use strict';

const path = require('path');

const express = require('express');
const hbs = require('hbs');
const fetch = require('node-fetch');

const config = require('./public/config/config');
const News = require('./models/news');
const topic = require('./mocks/news');
const routes = require('./routes/routes');

for (const news of topic) {
    new News(news).save();
}

const app = express();

const viewsDir = path.join(__dirname, 'views');

const partialsDir = path.join(viewsDir, 'partials');

const publicDir = path.join(__dirname, 'public');

app.set('views', viewsDir);

app.set('view engine', 'hbs');

app.use(express.static(publicDir));

app.use((req, res, next) => {
    res.locals.url = req.originalUrl;
    res.locals.meta = config.meta;
    next();
});

app.use((req, res, next) => {
    if (!res.locals.url.includes('query=') || !res.locals.url.includes('lattlong=')) {
        res.locals.urlLocation = '/?query=london';
    } else {
        res.locals.urlLocation = res.locals.url;
    }
    fetch(`${config.weatherApiUrl}search` + res.locals.urlLocation)
        .then(data => data.json())
        .then(json => {
            res.locals.title = json[0].title;
            res.locals.woeid = json[0].woeid;
            next();
        })
        .catch(err => next(err));
});

app.use((req, res, next) => {
    fetch(`${config.weatherApiUrl}` + res.locals.woeid)
        .then(data => data.json())
        .then(json => {
            json.consolidated_weather.length = 5;
            res.locals.forecast = json.consolidated_weather;
            res.locals.forecast.forEach(item => {
                item.temp = Math.round(item.the_temp);
                item.windSpeed = Math.round(item.wind_speed);
            });
            res.locals.infoToday = res.locals.forecast[0];
            next();
        })
        .catch(err => next(err));
});

routes(app);

hbs.registerPartials(partialsDir, () => {
    app.listen(8080, () => {
        console.info('Open http://localhost:8080');
    });
});

module.exports = app;
