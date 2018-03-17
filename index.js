'use strict';
const path = require('path');

const bodyParser = require('body-parser');
const config = require('config');
const express = require('express');
const hbs = require('hbs');
const morgan = require('morgan');

const routes = require('./routes');
const handleErrors = require('./middlewares/handleErrors');
const setInitialData = require('./middlewares/setInitialData');

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

app.use(setInitialData);

app.use(handleErrors);

// Подключаем маршруты
routes(app);

// Подключаем директорию с отдельными частями шаблонов
// Этот метод асинхронный и мы запускаем сервер только после того,
// как все частичные шаблоны будут прочитаны
hbs.registerPartials(path.join(partialsDir, 'weather'), () => {
    hbs.registerPartials(partialsDir, () => {
        // Запускаем сервер на порту 8080
        app.listen(config.get('port'), () => {
            console.info(`Open http://localhost:${config.get('port')}/`);
        });
    });
});

module.exports = app;
