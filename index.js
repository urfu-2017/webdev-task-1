'use strict';
const path = require('path');

const bodyParser = require('body-parser');
const config = require('config');
const express = require('express');
const hbs = require('hbs');
const morgan = require('morgan');

const indexJson = require('./mocks/index.json');
const routes = require('./routes');

const app = express();

// Определяем директорию для хранения шаблонов
const viewsDir = path.join(__dirname, 'views');

// Определяем директорию для хранения отдельных частей шаблонов
const partialsDir = path.join(viewsDir, 'partials');

// Определяем директорию для статичных файлов (изображений, стилей и скриптов)
const publicDir = path.join(__dirname, 'public');

// Подключаем шаблонизатор
app.set('view engine', 'hbs');

// Подключаем директорию с шаблонами
app.set('views', viewsDir);

// Логируем запросы к приложению в debug-режиме
if (config.get('debug')) {
    app.use(morgan('dev'));
}

app.use(express.static(publicDir));

app.use(bodyParser.json());

app.use((err, req, res, next) => {
    console.error(err.stack);

    next();
});

app.use((req, res, next) => {
    let data = indexJson[0];
    res.locals.title = data.title;
    res.locals.meta = data.meta;
    res.locals.main = data.main;

    next();
});

// Подключаем маршруты
routes(app);

app.use((err, req, res) => {
    console.error(err.stack);

    res.sendStatus(500);
});

// Подключаем директорию с отдельными частями шаблонов
// Этот метод асинхронный и мы запускаем сервер только после того,
// как все частичные шаблоны будут прочитаны
hbs.registerPartials(path.join(partialsDir, 'weather'), () => {
    hbs.registerPartials(partialsDir, () => {
        // Запускаем сервер на порту 8080
        app.listen(8080, () => {
            console.info('Open http://localhost:8080/');
        });
    });
});

module.exports = app;
