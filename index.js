'use strict';

const path = require('path');

const bodyParser = require('body-parser');
const express = require('express');
const hbs = require('hbs');

const routes = require('./routes/routes');

const app = express();

const viewsDir = path.join(__dirname, 'views');
const partialsDir = path.join(viewsDir, 'partials');
const publicDir = path.join(__dirname, 'public');

const Weather = require('./models/weather');

module.exports = app;

app.set('view engine', 'hbs');

app.set('views', viewsDir);

app.use(express.static(publicDir));

app.use(bodyParser.json());

app.use((req, res, next) => {

    res.locals.meta = {
        charset: 'utf-8',
        description: 'Илон слишком занят'
    };

    res.locals.title = 'Илон слишком занят';
    Weather.getWeather(req.query)
        .then(body => {
            res.locals.weather = body;
            next();
        });
});

routes(app);

app.use((err, req, res) => {
    console.error(err.stack);

    res.sendStatus(500);
});

hbs.registerPartials(partialsDir, () => {

    app.listen(8080, () => {
        console.info('Open http://localhost:8080/');
    });
});
