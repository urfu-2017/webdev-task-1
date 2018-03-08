'use strict';

const path = require('path');

const bodyParser = require('body-parser');
const express = require('express');
const hbs = require('hbs');

const routes = require('./routes');

const viewsDir = path.join(__dirname, 'views');
const partialsDir = path.join(viewsDir, 'partials');
const publicDir = path.join(__dirname, 'public');

const app = express();
app.set('view engine', 'hbs');
app.set('views', viewsDir);
app.use(express.static(publicDir));
app.use(bodyParser.json());
app.use((err, req, res, next) => {
    console.error(err.stack);

    next();
});

routes(app);

hbs.registerPartials(partialsDir, () => {
    app.listen(8080, () => {
        console.info('Open http://localhost:8080/');
    });
});
