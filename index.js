'use strict';
const getWeather = require('./middlewares/getWeather');
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const mainController = require('./controllers/mainController');
const newsController = require('./controllers/newsController');
const handlebarsSettings = require('./handlebarsSettings');
const weatherModels = require('./models/weatherModels');
const app = express();

app.engine('handlebars', exphbs({
    extname: 'handlebars',
    layoutDir: './views/layouts',
    partialsDir: [
        //  path to your partials
        './views/partials'
    ]
}));

app.set('view engine', 'handlebars');



app.use(express.static(path.join(__dirname, 'public'), {
    dotfiles: 'ignore', etag: false,
    extensions: 'html',
    index: false
}));

app.use(async (req, res, next) => {
    res.locals.weather = await weatherModels.getWeather(req.query);
    next();
});

app.get('/', mainController);

app.get('/:category', newsController);


app.listen(8080, () => {
    console.info(' Server started\n Open http://localhost:8080/');
});

app.use(function (req, res) {
    res.status(404);
    res.send({ error: 'Not found' });

    return;
});

exports.settings = handlebarsSettings;

module.exports = app;
