'use strict';
const path = require('path');

// const bodyParser = require('body-parser');
// const config = require('config');
const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');

const routes = require('./routes');

const app = express();
const viewsDir = path.join(__dirname, 'app/views');
const partialsDir = path.join(viewsDir, 'partials');
const publicDir = path.join(__dirname, 'app/public');

app.set('view engine', 'hbs');
app.set('views', viewsDir);

app.use(express.static(publicDir));

app.use(bodyParser.urlencoded({
    extended: true
}));

routes(app);

hbs.registerHelper('tempFixed', (temp) => {
    return temp.toFixed(1);
});

hbs.registerHelper('prettyData', (data) => {
    let dater = ['Января', 'Февраля', 'Марта', 'Апреля',
        'Мая', 'Июня', 'Июля', 'Августа',
        'Сентября', ' Октября', 'Ноября', 'Декабря'];
    let month = Number(data.split('-')[1]);
    let day = Number(data.split('-')[2].slice(0, 2));

    return day + ' ' + dater[month - 1];
});

hbs.registerPartials(partialsDir, () => {
    app.listen(8080, () => {
        console.info('Server started on 8080}');
        console.info('Open http://localhost:8080/');
    });
});

module.exports = app;
