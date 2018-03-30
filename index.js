'use strict';

const path = require('path');

const express = require('express');
const hbs = require('hbs');

const routes = require('./routes');
const { weatherData } = require('./middlewares/weatherData');

const app = express();

const viewsDir = path.join(__dirname, 'views');

const partialsDir = path.join(viewsDir, 'partials');

const publicDir = path.join(__dirname, 'public');

app.set('view engine', 'hbs');

app.set('views', viewsDir);

app.use(express.static(publicDir));

app.use(weatherData);

routes(app);

app.use((err, req, res) => {
    console.error(err.stack);

    res.sendStatus(500);
});

hbs.registerPartials(partialsDir, () => {
    app.listen(8080);
});


module.exports = app;
