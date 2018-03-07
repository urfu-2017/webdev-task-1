'use strict';

// Удобно разделять зависимости на три группы
// В первой – встроенные модули Node.js в алфавитном порядке
const path = require('path');

// Во второй – сторонние модули
const express = require('express');
const hbs = require('hbs');

// В третьей – собственные модули
const routes = require('./routes');

// Создаём экземпляр приложения
const app = express();

// Определяем директорию для хранения шаблонов.
// Для работы с директориями всегда используем модуль «path»
// и преобразуем относительные пути в абсолютные
const viewsDir = path.join(__dirname, 'views');

// Определяем директорию для хранения отдельных частей шаблонов
const partialsDir = path.join(viewsDir, 'partials');

// Определяем директорию для статичных файлов (изображений, стилей и скриптов)
const publicDir = path.join(__dirname, 'public');

// Подключаем шаблонизатор
app.set('view engine', 'hbs');

// Подключаем директорию с шаблонами
app.set('views', viewsDir);

// Отдаём статичные файлы из соответствующей директории
app.use(express.static(publicDir));

// Подключаем маршруты
routes(app);

// Подключаем директорию с отдельными частями шаблонов
// Этот метод асинхронный и мы запускаем сервер только после того,
// как все частичные шаблоны будут прочитаны
hbs.registerPartials(partialsDir, () => {
    // Запускаем сервер на порту 8080
    app.listen(8080, () => {
        console.info('Open http://localhost:8080/');
    });
});

module.exports = app;
