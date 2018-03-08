'use strict';

const path = require('path');

const hbs = require('hbs');
const express = require('express');

const routes = require('./routes');
const config = require('./config/default.json');
const { error500 } = require('./controllers/errors');

const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    res.locals.meta = config.meta;
    res.locals.lang = config.lang;
    res.locals.year = config.year;
    res.locals.title = config.title;
    res.locals.author = config.author;

    next();
});

routes(app);

app.use((err, req, res, next) => {
    /* eslint no-unused-vars: 0*/

    console.error(err);
    error500(req, res);
});

hbs.registerPartials(path.join(__dirname, 'views', 'partials'), () => {
    app.listen(process.env.PORT || config.port);
});

module.exports = app;
