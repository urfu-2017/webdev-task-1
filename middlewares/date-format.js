'use strict';

module.exports = function formatDate(date) {
    const monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr',
        'May', 'Jun', 'Jul', 'Aug',
        'Sep', 'Oct', 'Nov', 'Dec'
    ];
    const newDate = new Date(date);

    return monthNames[parseInt(newDate.getMonth())] + ' ' + newDate.getDate();
};
