'use strict';
const path = require('path');

const express = require('express');
const hbs = require('hbs');

const routes = require('./routes').routes;
const weather = require('./controllers/weather');

const app = express();
const viewsDir = path.join(__dirname, 'views');
const partialsDir = path.join(viewsDir, 'partials');
const publicDir = path.join(__dirname, 'public');

app.set('view engine', 'hbs');

app.set('views', viewsDir);

app.use(express.static(publicDir));

app.use((req, res, next) => {
    weather.getPlaces(req.query, widget => {
        res.locals.meta = {
            charset: 'utf-8',
            description: 'News and Weather app'
        };

        res.locals.title = 'NaW';
        res.locals.widget = widget;
        next();
    });
});

routes(app);

hbs.registerPartials(partialsDir, () => {
    app.listen(8080, () => {
        console.info('Open http://localhost:8080/');
    });
});

module.exports = app;
