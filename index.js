'use strict';
const path = require('path');

const express = require('express');
const hbs = require('hbs');
const app = express();

const weatherMiddleware = require('./middlewares/weather-middleware');

const publicDir = path.join(__dirname, 'public');
app.use(express.static(publicDir));

// Подключаем шаблонизатор
const viewsDir = path.join(__dirname, 'views');
const partialsDir = path.join(viewsDir, 'partials');

app.set('view engine', 'hbs');
app.set('views', viewsDir);

app.use(weatherMiddleware);

const frontPage = require('./mocks/front-page');

app.get('/', (req, res) => {
    res.render('index', frontPage);
});

// Подключаем директорию с отдельными частями шаблонов
// Этот метод асинхронный и мы запускаем сервер только после того,
// как все частичные шаблоны будут прочитаны
hbs.registerPartials(partialsDir, () => {
    app.listen(8080, () => {
        console.info(`Server started on ${8080}`);
        console.info(`Open http://localhost:${8080}/`);
    });
});

module.exports = app;
