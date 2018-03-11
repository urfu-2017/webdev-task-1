'use strict';

require('dotenv').config();
const path = require('path');


const express = require('express');
const hbs = require('hbs');
const morgan = require('morgan');

const routes = require('./routes');
const commonData = require('./middlewares/common-data');

const app = express();

const viewsDir = path.join(__dirname, 'views');
const partialsDir = path.join(viewsDir, 'partials');
const publicDir = path.join(__dirname, 'public');

app.set('view engine', 'hbs');
app.set('views', viewsDir);
app.use(morgan('dev'));
app.use(express.static(publicDir));
app.use(commonData);

routes(app);

app.use((err, req, res) => {
    console.error(err.stack);

    res.sendStatus(500);
});

hbs.registerPartials(partialsDir, () => {
    const port = 8080;
    app.listen(port, () => {
        console.info(`Server started on ${port}`);
        console.info(`Open http://localhost:${port}/`);
    });
});

module.exports = app;
