'use strict';
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const routes = require('./routes');

var app = express();
app.use(express.static(path.join(__dirname, '/public')));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

routes(app);

// app.listen(3000, () => console.info('app listening on port 3000!'));

module.exports = app;
