'use strict';

const path = require('path');

const express = require('express');
const hbs = require('hbs');
const config = require('config');

const routes = require('./routes');
const { setHeaders } = require('./middlewares/headers-setter');
const { fetchWeather } = require('./middlewares/weather-fetcher');
const { handleError } = require('./middlewares/error-handler');

require('./scss-converter.js')();

const app = express();

const viewsDir = path.join(__dirname, 'views');
const partialsDir = path.join(viewsDir, 'partials');
const publicDir = path.join(__dirname, 'public');

app.set('view engine', 'hbs');
app.set('views', viewsDir);

app.use(express.static(publicDir));

app.use((req, res, next) => setHeaders(req, res, next));
app.use((req, res, next) => fetchWeather(req, res, next));

routes(app);

app.use((err, req, res) => handleError(err, req, res));

hbs.registerPartials(partialsDir, () => {
    app.listen(config.get('port'), () => {
        console.info(`Open http://localhost:${config.get('port')}`);
    });
});

module.exports = app; // чтобы тест проходился
