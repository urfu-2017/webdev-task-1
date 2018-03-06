'use strict';

const express = require('express');
const hbs = require('express-handlebars');

const config = require('./config');
const setupMiddleware = require('./middleware');
const setupRoutes = require('./routes');

const app = express();

app.set('view engine', '.hbs');

app.engine('hbs', hbs({
    extname: 'hbs',
    partialsDir: [`${__dirname}/views/partials`]
}));

setupMiddleware(app);
setupRoutes(app);

app.listen(config.PORT);

module.exports = app;
