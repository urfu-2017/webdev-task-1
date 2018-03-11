'use strict';
const path = require('path');

const express = require('express');
const hbs = require('hbs');

const routes = require('./routes').routes;
const weather = require('./controllers/weather');

const app = express();
const viewsDir = path.join(__dirname, 'views');
const partialsDir = path.join(viewsDir, 'partials');
const publicDir = path.join(__dirname, 'public');

let locals = {
    meta: {
        charset: 'utf-8',
        description: 'News and Weather app'
    },
    title: 'NaW'
};
Object.assign(app.locals, locals);

app.set('view engine', 'hbs');

app.set('views', viewsDir);

app.use(express.static(publicDir));

app.use((req, res, next) => {
    // Чтобы постоянно не подгружать погоду. Оттуда и тормоза были.
    // По хорошему еще нужно добавить сравнение timestamp-ов, чтобы обновлять раз в день.
    if (!app.locals.widget) {
        weather.getPlaces(req.query)
            .then(widget => {
                app.locals.widget = widget;

                next();
            })
            .catch(err => console.error(err));

    } else {
        next();
    }
});

routes(app);

hbs.registerPartials(partialsDir, () => {
    app.listen(process.env.MY_PORT, () => {
        console.info('Open http://localhost:8080/');
    });
});

module.exports = app;
