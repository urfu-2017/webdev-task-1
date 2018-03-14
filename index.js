'use strict';

const path = require('path');

const express = require('express');
const hbs = require('hbs');

const routes = require('./routes');
const config = require('./config');
const initialData = require('./middlewares/setInitialData');

const app = express();

const viewsDir = path.join(__dirname, 'views');
const partialsDir = path.join(viewsDir, 'partials');
const publicDir = path.join(__dirname, 'public');

app.set('view engine', 'hbs');
app.set('views', viewsDir);


app.use(express.static(publicDir));
app.use(initialData);
routes(app);

const port = config.port || 8080;
// Подключаем директорию с отдельными частями шаблонов
// Этот метод асинхронный и мы запускаем сервер только после того,
// как все частичные шаблоны будут прочитаны
hbs.registerPartials(partialsDir, () => {
    app.listen(port, () => {
        console.info(`Open http://localhost:${port}`);
    });
});

module.exports = app;
