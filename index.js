'use strict';
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const request = require('request-promise-native');
const config = require('config');
const urlencode = require('urlencode');
const routes = require('./routes');
const { URL, URLSearchParams } = require('url');

let countryForNews = config.countryForNews;
let townForWeather = config.townForWeather;
let urlForWeatherPic = new URL(config.urlForWeatherPic);
let cache = {};
let dayOptions = { year: 'numeric', month: 'long', day: 'numeric' };

var app = express();
app.use(express.static(path.join(__dirname, '/public')));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

routes(app);

app.listen(3000, () => console.info('app listening on port 3000!'));

module.exports = app;
