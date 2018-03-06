'use strict';

const path = require('path');
const express = require('express');

const config = require('./config');
const configureTemplateEngine = require('./configureTemplateEngine');
const weatherData = require('./middlewares/weather-data');

const newsController = require('./controllers/news');
const errorsController = require('./controllers/errors');

const publicDir = path.resolve(__dirname, 'public');

const app = express();

// configure workflow
app.use(express.static(publicDir));
configureTemplateEngine(app);
app.use(weatherData);

// routing

app.get('/', newsController.index);
app.get('/:category', newsController.category);
app.get('*', errorsController.notFound);

// Run app
app.listen(config.server.port, () => {
    console.info('Server run on ' + config.server.port + ' port');
});

module.exports = app;
