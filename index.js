'use strict';

const path = require('path');


const express = require('express');
const hbs = require('hbs');

const app = express();

const viewsDir = path.join(__dirname, 'views');

app.set('view engine', 'hbs');
app.set('views', viewsDir);

module.exports = app;
