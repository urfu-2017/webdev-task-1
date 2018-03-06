'use strict';

const express = require('express');
const hbs = require('express-handlebars');

const config = require('./config');
const setupMiddleware = require('./middleware');
const setupRoutes = require('./routes');

const app = express();

app.engine('hbs', hbs({
    extname: 'hbs',
    partialsDir: [`${__dirname}/views/partials`]
}));

app.set('view engine', 'hbs');

setupMiddleware(app);
setupRoutes(app);

module.exports = app.listen(config.PORT);
