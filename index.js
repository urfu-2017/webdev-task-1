'use strict';

const path = require('path');
const express = require('express');
const hbs = require('hbs');
const routes = require('./routes');

const viewsDir = path.join(__dirname, 'views');
const partialsDir = path.join(viewsDir, 'partials');
const publicDir = path.join(__dirname, 'public');

const getWeather = require('./models/getWeather');
const General = require('./models/General');

const app = express();
const gereralInfo = {
    name: 'Удобный сервис для Билли',
    developer: 'spt30',
    year: '2018'
};
const newsCategories = [{ href: 'business', categoryTitle: 'Бизнес' },
    { href: 'entertainment', categoryTitle: 'Развлечения' },
    { href: 'general', categoryTitle: 'Общее' },
    { href: 'health', categoryTitle: 'Здоровье' },
    { href: 'science', categoryTitle: 'Наука' },
    { href: 'sport', categoryTitle: 'Спорт' },
    { href: 'technology', categoryTitle: 'Технологии' }];

app.set('view engine', 'hbs');
app.set('views', viewsDir);

app.use(express.static(publicDir));

app.use((req, res, next) => {
    res.locals.meta = {
        charset: 'utf-8'
    };

    res.locals.title = 'Ilon is very busy';

    res.locals.aboutAuthor = new General(gereralInfo);

    res.locals.newsCategories = newsCategories;

    next();
});

app.use(async (req, res, next) => {
    res.locals.weather = await getWeather(59.932739, 30.306721);

    next();
});

routes(app);

hbs.registerPartials(partialsDir, () => {
    app.listen(8080);
});

module.exports = app;
