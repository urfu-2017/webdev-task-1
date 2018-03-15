import config from '../../config';


export const getDateString = date =>
    `${date.getDate()} ${config.monthNames[date.getMonth()]}`;


export const getTimeString = date =>
    date.toLocaleTimeString('ru', { hour: 'numeric', minute: 'numeric' });
