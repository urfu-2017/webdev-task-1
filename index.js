'use strict';

const path = require('path');
const { readdirSync } = require('fs');

checkConfig();

const bodyParser = require('body-parser');
const config = require('config');
const hbs = require('hbs');
const hbsutils = require('hbs-utils')(hbs);
const express = require('express');

const commonData = require('./middlewares/common-data');
const routes = require('./routes');
const helpers = require('./helpers');

const viewsDir = path.join(__dirname, 'views');
const partialsDir = path.join(viewsDir, 'components');
const publicDir = path.join(__dirname, 'public');

const app = express();

app.set('view engine', 'hbs');
app.set('views', viewsDir);

if (process.env.NODE_ENV === 'development') {
    app.use(express.static(publicDir));
}

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(commonData);

helpers(hbs);
routes(app);

registerAllPartials(partialsDir)
    .then(() => app.listen(config.get('port')))
    .catch(error => console.error(error));

module.exports = app;

async function registerAllPartials(directory) {
    const directoryItems = readdirSync(directory);

    for (const partial of directoryItems) {
        if (partial !== 'index.styl') {
            await registerPartial(path.join(directory, partial));
        }
    }
}

function registerPartial(directory) {
    return new Promise(resolve => {
        if (!config.has('debug')) {
            hbs.registerPartials(directory, resolve);
        } else {
            hbsutils.registerWatchedPartials(directory, resolve);
        }
    });
}

function checkConfig() {
    process.env.NODE_CONFIG_DIR = path.join(__dirname, 'config');

    const directoryItems = readdirSync(process.env.NODE_CONFIG_DIR);

    if (directoryItems.map(item => item.split('.')[0]).indexOf(process.env.NODE_ENV) === -1) {
        process.env.NODE_ENV = 'development';
    }
}
