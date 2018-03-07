'use strict';

const path = require('path');

const hbs = require('hbs');
const config = require('config');
const express = require('express');

const routes = require('./routes');
const { error500 } = require('./controllers/errors');

const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    res.locals.meta = config.get('meta');
    res.locals.lang = config.get('lang');
    res.locals.year = config.get('year');
    res.locals.title = config.get('title');
    res.locals.author = config.get('author');

    next();
});

routes(app);

app.use((err, req, res, next) => {
    /* eslint no-unused-vars: 0*/

    console.error(err);
    error500(req, res);
});

hbs.registerPartials(path.join(__dirname, 'views', 'partials'), () => {
    app.listen(process.env.PORT || config.get('port'));
});

module.exports = app;
