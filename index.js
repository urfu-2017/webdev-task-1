/* eslint-disable no-unused-vars */
'use strict';

const getWeather = require('./middlewares/getWeather');
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
let mainController = require('./controllers/mainController');
let newsController = require('./controllers/newsController');
const handlebarsSettings = require('./handlebarsSettings');

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

app.use(getWeather);


app.use(express.static(path.join(__dirname, 'public'), {
    dotfiles: 'ignore', etag: false,
    extensions: 'html',
    index: false
}));


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


module.exports = app;
