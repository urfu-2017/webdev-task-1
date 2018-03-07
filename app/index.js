'use strict';
const path = require('path');
const hbs = require('hbs');
const morgan = require('morgan');

const express = require('express');

const config = require('../config');
const routes = require('./routes');
const commonData = require('./middlewares/common-data');


const viewsDir = path.join(__dirname, 'views');
const partialsDir = path.join(viewsDir, 'common.blocks');
const publicDir = path.join(__dirname, 'public');

const app = express();

app.set('view engine', 'hbs');
app.set('views', viewsDir);
app.use(morgan('dev'));
app.use(express.static(publicDir));
app.use(commonData);
routes(app);

app.use((err, req, res, next) => {
    /* eslint no-unused-vars: 0 */
    console.error(err.stack);

    res.sendStatus(500);
});

hbs.registerPartials(partialsDir, () => {
    const port = config.port;

    app.listen(port, () => {
        console.info(`Server started on ${port}`);
        console.info(`Open http://localhost:${port}/`);
    });
});


module.exports = app;
