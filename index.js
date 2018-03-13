'use strict';
const express = require('express');
const exphbs = require('express-handlebars');

const getWeatherMiddleware = require('./middlewares/weather').getWeather;

const newsController = require('./controllers/newsController').newsController;
const indexController = require('./controllers/indexController').indexController;

const app = express();
const port = 8080;

module.exports = app;

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(express.static('public'));

app.use(getWeatherMiddleware);

app.get('/news/:category', newsController);
app.get('/', indexController);

app.listen(port, function () {
    console.info(`App is started on port ${port}.`);
});
