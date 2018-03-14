'use strict';
const Handlebars = require('handlebars');
const HandlebarsIntl = require('handlebars-intl');
const moment = require('moment');


Handlebars.registerHelper('sformatTime', (date, format) => {
    let mmnt = moment(date);

    return mmnt.format(format);
});

// Полезный хэлпер который много что умеет, например работа с датами,  цифрами
HandlebarsIntl.registerWith(Handlebars);
