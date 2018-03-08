'use strict';
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const morgan = require('morgan');
const config = require('config');
const MomentHelper = require('handlebars.moment');

const routes = require('./routes');
const categories = require('./mocks/categories');
const CategoriesRepository = require('./dataAccess/categoriesRepository');
const categoriesRepository = new CategoriesRepository();
const weatherWidget = require('./handlers/weatherWidget');
const countrySetter = require('./handlers/countrySetter');

for (const category of categories) {
    categoriesRepository.save(category);
}

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
MomentHelper.registerHelpers(hbs);

hbs.registerHelper('skipFirst', array => array.slice(1));

// Подключаем директорию с шаблонами
app.set('views', viewsDir);

// Отдаём статичные файлы из соответствующей директории
app.use(express.static(publicDir));

// Разбираем тело POST запроса, чтобы сохранить заметку
// Запрос приходит в JSON формате, поэтому используем json-парсер
app.use(bodyParser.json());

// Выводим ошибку, если не смогли разобрать POST запрос, и продолжаем работу
app.use((err, req, res, next) => {
    console.error(err.stack);

    next();
});

// Собираем общие данные для всех страниц приложения
app.use((req, res, next) => {
    // Хранение в res.locals – рекомендованный способ
    // Не перезаписываем, а дополняем объект
    res.locals.meta = {
        charset: 'utf-8',
        description: 'Новости'
    };

    res.locals.title = 'Новости';

    next();
});

app.use(countrySetter.countrySetter);
app.use(weatherWidget.weatherWidget);

// Подключаем маршруты
routes(app);

// Фиксируем фатальную ошибку и отправляем ответ с кодом 500
app.use((err, req, res) => {
    console.error(err.stack);

    res.sendStatus(500);
});

// Подключаем директорию с отдельными частями шаблонов
// Этот метод асинхронный и мы запускаем сервер только после того,
// как все частичные шаблоны будут прочитаны
hbs.registerPartials(partialsDir, () => {
    // Запускаем сервер на порту 8080
    app.listen(8080, () => {
        console.info('Open http://localhost:8080/notes');
    });
});


module.exports = app;
