'use strict';

const bodyParser = require('body-parser');
const morgan = require('morgan');
const express = require('express');
const app = express();
const hbs = require('hbs');
const helperDate = require('helper-date');
const lessMiddleware = require('less-middleware');
const path = require('path');
const middleware = require('./middlewares');

const routes = require('./routes');

app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(lessMiddleware(path.resolve(__dirname, 'public')));
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(morgan('dev'));
app.use(middleware.weatherMiddleware);
routes(app);
hbs.registerHelper('date', helperDate);
hbs.registerPartials(path.resolve(__dirname, 'views/partials'), () => {
    app.listen(8080);
});

module.exports = app;
