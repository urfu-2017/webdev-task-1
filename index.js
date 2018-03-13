/* eslint-disable strict */

'use strict';

const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
require('handlebars-helpers').comparison();

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/public')));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views/layouts')
}));
app.set('view engine', '.hbs');

require('./routes')(app);

if (require.main === module) {
    const port = 8080;
    const url = `http://localhost:${port}/`;
    // eslint-disable-next-line no-console
    app.listen(port, () => console.log(`Сервис работает по адрес:\n${url}`));
}

module.exports = app;
