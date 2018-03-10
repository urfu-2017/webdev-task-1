'use strict';


const path = require('path');


const express = require('express');
const hbs = require('hbs');


const routes = require('./routes');
const { fetchWeather } = require('./middlewares/weatherFetcher');
const info = require('./config/info');


const app = express();

const viewsDir = path.join(__dirname, 'views');
const partialsDir = path.join(viewsDir, 'partials');
const publicDir = path.join(__dirname, 'public');

app.set('view engine', 'hbs');
app.set('views', viewsDir);

app.use(express.static(publicDir));

app.use((req, res, next) => {
    res.locals.meta = info.meta;
    res.locals.title = info.title;
    res.locals.header = info.header;
    fetchWeather(req.query)
        .then(weather => {
            res.locals.weather = weather;
            next();
        });
});

routes(app);

app.use((err, req, res) => {
    console.error(err.stack);

    res.sendStatus(500);
});


hbs.registerPartials(partialsDir, () => {
    app.listen(8080, () => {
        console.info('Open http://localhost:8080');
    });
});

module.exports = app; // чтобы тест проходился

