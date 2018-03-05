'use strict';

const path = require('path');

const bodyParser = require('body-parser');
const config = require('config');
const express = require('express');
const hbs = require('hbs');
const request = require('request');
const morgan = require('morgan');

const routes = require('./routes');

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

app.use((req, res, next) => {
    res.locals.meta = {
        charset: 'utf-8',
        description: 'webdev-task-1'
    };

    res.locals.title = 'webdev-task-1';

    next();
});

routes(app);

app.use((err, req, res) => {
    console.error(err.stack);

    res.sendStatus(500);
});

hbs.registerPartials(partialsDir, () => {
    app.listen(8080, () => {
        console.info('Opened in localhost:8080');
    });
});

module.exports = app;
