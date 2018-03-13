'use strict';

function numberMonth(num) {
    let arrayMonth = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля',
        'августа', 'сентября', 'октября', 'ноября', 'Декабря'];

    return arrayMonth[num];
}

module.exports = numberMonth;
