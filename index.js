'use strict';

const path = require('path');

const express = require('express');
const config = require('config');

const routes = require('./routes');

const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, '/public')));

app.use((req, res, next) => {
    res.locals.meta = config.get('meta');
    res.locals.lang = config.get('lang');
    res.locals.title = config.get('title');

    next();
});

routes(app);

app.use((err, req, res, next) => {
    /* eslint no-unused-vars: 0*/

    console.error(err);
    res.sendStatus(500);
});

app.listen(process.env.PORT || config.get('port'));

module.exports = app;
