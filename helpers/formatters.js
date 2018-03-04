'use strict';
const moment = require('moment');

exports.formatDate = (date, format) => moment(date)
    .locale('ru')
    .format(format);

exports.formatTemperature = (value) => {
    const temp = Math.round(value);

    return (temp > 0 ? '+' : '') + temp;
};
