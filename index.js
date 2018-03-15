'use strict';

require('dotenv').config();

const express = require('express');
const hbs = require('hbs');
const path = require('path');
const config = require('config');

const data = require('./data/data.json');
const weatherMiddleware = require('./middlewares/weather');

const app = express();

Object.assign(app.locals, data);

app.set('view engine', 'hbs');
hbs.localsAsTemplateData(app);
hbs.registerPartials(path.join(__dirname, 'views', 'partials'));

app.use(weatherMiddleware);
app.use(express.static(path.join(__dirname, 'public')));

require('./routes')(app);
require('moment').locale('ru');

app.listen(config.get('port'), () => console.info('Server launched'));

module.exports = app;
