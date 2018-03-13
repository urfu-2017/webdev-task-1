'use strict';

const path = require('path');

const express = require('express');

require('dotenv').config();

const routes = require('./routes');
const weatherMiddleware = require('./middlewares/weather');

const app = express();

const viewsDir = path.join(__dirname, 'views');
const publicDir = path.join(__dirname, 'public');

app.set('view engine', 'hbs');
app.set('views', viewsDir);

app.use(express.static(publicDir));
app.use(weatherMiddleware.getCurrentWeather);

routes(app);

app.listen(8080, () => {
    console.info('Open http://localhost:8080/');
});

module.exports = app;
