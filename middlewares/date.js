'use strict';

const MONTHS = [
    'Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня',
    'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'
];

exports.formatDate = date => {
    let dayNumber = date.getDate();
    let monthNumber = date.getMonth();

    return `${dayNumber} ${MONTHS[monthNumber]}`;
};
