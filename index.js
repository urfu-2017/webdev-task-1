'use strict';
const path = require('path')
const express = require('express');
const hbs = require('hbs');
const route = require('./routes')


const staticDirectory = path.join(__dirname, 'public');
const partialsDirectory = path.join(__dirname, 'views', 'partials');
const port = 8000;

const app = express();

app.use(express.static(staticDirectory));

app.set('view engine', 'hbs');

hbs.registerPartials(partialsDirectory, () => {
    app.listen(port, () => console.info(`Server had started on localhost:${port}`));
});

route(app);


module.exports = app;
