/* eslint-disable max-len,no-unused-vars,indent */
'use strict';
const request = require('request');
let MetaWeather = require('metaweather');
const getWeather = require('./middlewares/getWeather');
const frontPage = require('./mocks/front-info');
var HandlebarsIntl = require('handlebars-intl');
var moment = require('moment');
let mw = new MetaWeather();
let express = require('express');
let path = require('path');
let app = express();
var Handlebars = require('handlebars');
app.use(getWeather);
moment.locale('ru');
Handlebars.registerHelper('sformatTime', (date, format) => {
    var mmnt = moment(date);

    return mmnt.format(format);
});
exports.error404 = (req, res) => res.sendStatus(404);

let exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
    extname: 'handlebars',
    layoutDir: './views/layouts',
    partialsDir: [
        //  path to your partials
        './views/partials'
    ]
}));
app.set('view engine', 'handlebars');
let options = { dotfiles: 'ignore', etag: false,
    extensions: 'html',
    index: false
};
HandlebarsIntl.registerWith(Handlebars);


Handlebars.registerHelper('dateFormat', require('handlebars-dateformat'));

global.country = '';
global.category = '';

app.use(express.static(path.join(__dirname, 'public'), options));


app.get('/', (req, res) => {
    res.render('main', frontPage); // this is the important part
});

app.get('/:category', async (req, res1) => {
    global.country = req.query.country || 'ru';
    console.info(req.params.category);
    global.category = req.params.category;
    await request(
        'https://newsapi.org/v2/top-headlines?apiKey=7003d399f6ae49cbbd75437b2fb4d33a&country=' + global.country +
        '&category=' + global.category,
        { json: true },
        (err, res, body) => {
            if (err) {
                return;
            }
            // console.info(body.url);
            // console.info(body.articles);
            let arti = body;
            res1.render('news', arti);
            // console.info(arti);
            // console.info(req.query.country);
        });
});

    app.listen(8080, () => {
        console.info(`Server started on ${8080}`);
        console.info(`Open http://localhost:${8080}/`);
    });

module.exports = app;
