'use strict';

const MONTHS = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
if (MONTHS.length !== 12) {
    throw new Error('Oops...');
}


const _getDateString = date =>
    `${date.getDate()} ${MONTHS[date.getMonth()]}`;


const _getTimeString = date =>
    date.toLocaleTimeString('ru', { hour: 'numeric', minute: 'numeric' });


exports.getDateString = _getDateString;
exports.getTimeString = _getTimeString;
