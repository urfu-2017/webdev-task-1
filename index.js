'use strict';

const express = require('express');
const hbs = require('hbs');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, '/public')));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, '/views/partials'), () => {
    app.set('view options', { layout: 'main' });
});
require('./routes')(app);

app.listen(8000);

module.exports = app;
