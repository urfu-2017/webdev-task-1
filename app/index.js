'use strict';

const express = require('express');
const hbs = require('hbs');
const path = require('path');

const app = express();

require('./routes')(app);

app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, '/views/partials'), () => {
    app.listen(8010);
});
