'use strict';

const path = require('path');

const express = require('express');
const hbs = require('hbs');

const routes = require('./routes');

const app = express();

const viewsDir = path.join(__dirname, 'views');
const partialsDir = path.join(viewsDir, 'partials');
const publicDir = path.join(__dirname, 'bundle');

app.set('view engine', 'hbs');
app.set('views', viewsDir);

app.use(express.static(publicDir));

routes(app);

hbs.registerPartials(partialsDir, () => app.listen(8080));
