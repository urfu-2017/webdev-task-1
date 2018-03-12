'use strict';

const path = require('path');

const express = require('express');
const hbs = require('hbs');

const routes = require('./routes');
const { setHeaders } = require('./middlewares/headers-setter');
const { fetchWeather } = require('./middlewares/weather-fetcher');
const { handleError } = require('./middlewares/error-handler');
const { port } = require('./config/default.js');

const app = express();

const viewsDir = path.join(__dirname, 'views');
const partialsDir = path.join(viewsDir, 'partials');
const publicDir = path.join(__dirname, 'public');

app.set('view engine', 'hbs');
app.set('views', viewsDir);

app.use(express.static(publicDir));

app.use(setHeaders);
app.use(fetchWeather);

routes(app);

app.use(handleError);

hbs.registerPartials(partialsDir, () => {
    app.listen(port, () => {
        console.info(`Open http://localhost:${port}`);
    });
});

module.exports = app; // чтобы тест проходился
