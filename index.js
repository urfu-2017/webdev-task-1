'use strict';

const path = require('path');
const express = require('express');

const app = express();
const configureTemplateEngine = require('./configureTemplateEngine');

const ignoreStatic = require('./middlewares/ignore-static');
const weatherData = require('./middlewares/weather-data');

const homeController = require('./controllers/home');

const publicDir = path.resolve(__dirname, 'public');

configureTemplateEngine(app);

app.use(express.static(publicDir));
app.use(ignoreStatic(weatherData));

app.get('/', homeController);
app.get('/:category', homeController);

app.listen(8080);
module.exports = app;
