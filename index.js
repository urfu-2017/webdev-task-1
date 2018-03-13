'use strict';

const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'hbs');
require('./routes')(app);
app.engine('hbs', hbs({
    extname: 'hbs',
    partialsDir: [
        path.join(__dirname, 'views', 'partials')
    ]
}));
app.listen(8080);

module.exports = app;
