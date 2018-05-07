'use strict';

require('dotenv').config();
const express = require('express');
const hbs = require('hbs');
const path = require('path');


const routes = require('./routes');
const common = require('./middleware/common');

const app = express();
app.set('view engine', 'hbs');
app.set('views', path.resolve('views'));
app.use(express.static(path.resolve('public')));
app.use(common);
routes(app);

hbs.registerPartials(path.resolve('views/partials'), () => {
    app.listen(8080, () => {
        console.info(`Server started on 8080`);
    });
});

module.exports = app;
