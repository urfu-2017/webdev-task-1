'use strict';

const MOTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

module.exports = hbs => {
    hbs.registerHelper('toFixed', function (number) {
        return number.toFixed(2);
    });

    hbs.registerHelper('getWeatherTable', function (days) {
        return days.map(day => {
            const [, m, d] = day.applicable_date.split('-');
            const date = `${d} ${MOTHS[parseInt(m) - 1]}`;

            return {
                temp: day.the_temp,
                wind: day.wind_speed,
                date
            };
        });
    });
};
