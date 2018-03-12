'use strict';

const MONTHS = [
    'Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня',
    'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'
];

exports.formatDate = date => {
    const dayNumber = date.getDate();
    const monthNumber = date.getMonth();

    return `${dayNumber} ${MONTHS[monthNumber]}`;
};
