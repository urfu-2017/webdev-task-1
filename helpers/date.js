'use strict';

exports.parseDate = (date) => {
    const months = [
        'января',
        'февраля',
        'марта',
        'апреля',
        'мая',
        'июня',
        'июля',
        'августа',
        'сентября',
        'октября',
        'ноября',
        'декабря'
    ];
    const [, month, day] = date.split('-');
    const monthName = months[parseInt(month, 10) - 1];
    const dayNumber = parseInt(day, 10);

    return dayNumber + ' ' + monthName;
};

exports.parseTime = (time) => {
    const [date, hhmmss] = time.split('T');
    const hhmm = hhmmss.slice(0, 5);

    return exports.parseDate(date) + ' в ' + hhmm;
};
