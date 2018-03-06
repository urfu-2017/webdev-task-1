/* eslint-disable max-len */
'use strict';
const request = require('request');
let MetaWeather = require('metaweather');
const getWeather = require('./middlewares/getWeather');


var HandlebarsIntl = require('handlebars-intl');
var moment = require('moment');
let mw = new MetaWeather();
let express = require('express');
let path = require('path');
let app = express();
var Handlebars = require('handlebars');
app.use(getWeather);
moment.locale('ru');
Handlebars.registerHelper('sformatTime', function (date, format) {
    var mmnt = moment(date);

    return mmnt.format(format);
});

let exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
    extname: 'handlebars',
    defaultLayout: 'main',
    layoutDir: './views/layouts',
    partialsDir: [
        //  path to your partials
        './views/partials'
    ]
}));
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);
let options = { dotfiles: 'ignore', etag: false,
    extensions: ['htm', 'html'],
    index: false
};
HandlebarsIntl.registerWith(Handlebars);

function sleep(ms) {
    ms += new Date().getTime();
    while (new Date() < ms) {}
}

Handlebars.registerHelper('dateFormat', require('handlebars-dateformat'));

global.country = '';
global.category = '';

app.use(express.static(path.join(__dirname, 'public'), options));


app.get('/', function(req, res)
{
    res.render('hello');   // this is the important part
});


app.listen(app.get('port'), function () {
    console.info('Hello express started on http://localhost:' +
        app.get('port') + '; press Ctrl-C to terminate.');
});

app.get('/news', function (req, res1) {
    global.query = req.query.query || 'moscow';
    global.country = req.query.country || 'ru';
    //console.info(req.query.country);
    request(
        'https://newsapi.org/v2/top-headlines?apiKey=7003d399f6ae49cbbd75437b2fb4d33a&country=' + global.country +
        '&category=' + global.category,
        { json: true },
        (err, res, body) => {
            if (err) {
                return console.info(err);
            }
            // console.info(body.url);
            // console.info(body.articles);
            let arti = body;
            res1.render('news', arti);
            console.info(arti);
            // console.info(req.query.country);
        });
});


