'use strict';


const path = require('path');


const express = require('express');
const hbs = require('hbs');


// В третьей – собственные модули
const { getWeather } = require('./controllers/getweather');
const routes = require('./routes');
const categories = require('./mocks/categories');
const Category = require('./models/category');

for (const cat of categories) {
    new Category(cat).save();
}


const app = express();

const viewsDir = path.join(__dirname, 'views');


const partialsDir = path.join(viewsDir, 'partials');


const publicDir = path.join(__dirname, 'public');


app.set('view engine', 'hbs');


app.set('views', viewsDir);


app.use(express.static(publicDir));


app.use((req, res, next) => {

    res.locals.meta = {
        charset: 'utf-8',
        description: 'Илон слишком занят'
    };

    res.locals.title = 'Илон слишком занят';
    res.locals.weather = getWeather(req.query);
    next();
});


routes(app);


app.use((err, req, res) => {
    console.error(err.stack);

    res.sendStatus(500);
});


hbs.registerPartials(partialsDir, () => {
    app.listen(8080);
});


module.exports = app;
