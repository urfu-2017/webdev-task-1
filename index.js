'use strict';

const path = require('path');

const express = require('express');
const hbs = require('hbs');

require('dotenv').config();

const routes = require('./routes');
const weatherMiddleware = require('./middlewares/weather');

const viewsDir = path.join(__dirname, 'views');
const publicDir = path.join(__dirname, 'public');
const partialsDir = path.join(viewsDir, 'partials');

const app = express();

app.set('view engine', 'hbs');
app.set('views', viewsDir);

app.use(express.static(publicDir));
app.use(weatherMiddleware.getCurrentWeather);

routes(app);

hbs.registerPartials(partialsDir, () => {
    app.listen(8080, () => {
        console.info('Open http://localhost:8080/');
    });
});

module.exports = app;
