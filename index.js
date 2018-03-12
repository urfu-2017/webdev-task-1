'use strict';
const frontPage = require('./mocks/front-info');
const getWeather = require('./middlewares/getWeather');
const HandlebarsIntl = require('handlebars-intl');
const express = require('express');
const moment = require('moment');
const path = require('path');
const Handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('7003d399f6ae49cbbd75437b2fb4d33a');

let app = express();

app.engine('handlebars', exphbs({
    extname: 'handlebars',
    layoutDir: './views/layouts',
    partialsDir: [
        //  path to your partials
        './views/partials'
    ]
}));

app.set('view engine', 'handlebars');
let options = {
    dotfiles: 'ignore', etag: false,
    extensions: 'html',
    index: false
};

app.use(getWeather);

// Хэлпер Moment преобразует дату в верный форамат для каждого из языков
Handlebars.registerHelper('sformatTime', (date, format) => {
    let mmnt = moment(date);

    return mmnt.format(format);
});

// Полезный хэлпер который много что умеет, например работа с датами,  цифрами
HandlebarsIntl.registerWith(Handlebars);

app.use(express.static(path.join(__dirname, 'public'), options));


app.get('/', (req, res) => {
    global.userLang = req.headers['accept-language'];
    moment.locale(global.userLang);
    res.render('main', frontPage); // this is the important part
});

app.get('/:category', async (req, res1) => {
    let country = req.query.country || 'ru';
    let category = req.params.category;
    newsapi.v2.topHeadlines({
        category: category.toString(),
        language: global.userLang,
        country: country.toString()
    }).then(response => {
        let article = response;
        res1.render('news', article);
    });
});


app.listen(8080, () => {
    console.info(' Server started\n Open http://localhost:8080/');
});

exports.error404 = (req, res) => res.sendStatus(404);

module.exports = app;
