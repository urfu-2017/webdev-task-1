'use strict';

const path = require('path');

const config = require('config');
const express = require('express');
const hbs = require('hbs');
const morgan = require('morgan');

const routes = require('./routes');
const weatherWidget = require('./repository/weatherWidget');

const app = express();

const viewsDir = path.join(__dirname, 'views');

const partialsDir = path.join(viewsDir, 'partials');

const publicDir = path.join(__dirname, 'public');

app.set('view engine', 'hbs');

app.set('views', viewsDir);

if (config.get('debug')) {
    app.use(morgan('dev'));
}

app.use(express.static(publicDir));

app.use((err, req, res, next) => {
    console.error(err.stack);

    next();
});

app.use(weatherWidget);

app.use((req, res, next) => {
    res.locals.meta = {
        charset: 'utf-8',
        description: 'Новости'
    };

    res.locals.title = 'Новости';

    next();
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

module.exports = app;
