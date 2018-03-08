'use strict';

const fs = require('fs');

const express = require('express');
const hbs = require('hbs');

const routes = require('./routes');
const settings = require('./settings');

function loadInitialData() {
    const Category = require('./models/category');
    const categories = require('./data/categories');

    for (const category of categories) {
        new Category(category.name, category.title, category.icon).save();
    }
}

function registerFuckingPartialsSync(partialsDir, hbsInstance) {
    var filenames = fs.readdirSync(partialsDir);

    filenames.forEach(filename => {
        var matches = /^([^.]+).hbs$/.exec(filename);
        if (!matches) {
            return;
        }
        var name = matches[1];
        var template = fs.readFileSync(partialsDir + '/' + filename, 'utf8');
        hbsInstance.registerPartial(name, template);
    });
}

loadInitialData();

const app = express();
app.use(express.static(settings.publicDir));
app.set('view engine', 'hbs');
app.set('views', settings.viewsDir);
registerFuckingPartialsSync(settings.partialsDir, hbs);
routes(app);

app.listen(settings.serverPort, () => {
    console.info(`Сервер запущен по адресу http://localhost:${settings.serverPort}/`);
});

module.exports = app;
