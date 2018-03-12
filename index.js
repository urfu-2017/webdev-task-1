'use strict';

const express = require('express');
const hbs = require('hbs');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'hbs');
require('./routes')(app);
hbs.registerPartials(path.join(__dirname, 'views', 'partials'), () => {
    app.listen(8080);
});

module.exports = app;
