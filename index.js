'use strict';

const path = require('path');
const express = require('express');

const app = express();
const configureTemplateEngine = require('./configureTemplateEngine');

const ignoreStatic = require('./middlewares/ignore-static');
const weatherData = require('./middlewares/weather-data');

const newsController = require('./controllers/news');
const errorsController = require('./controllers/errors');

const publicDir = path.resolve(__dirname, 'public');

// configure workflow
configureTemplateEngine(app);
app.use(express.static(publicDir));
app.use(ignoreStatic(weatherData));

// routing

app.get('/', newsController.index);
app.get('/:category', newsController.category);
app.get('*', errorsController.notFound);

// Run app
app.listen(8080);
module.exports = app;
