'use strict';

const { getWeather } = require('./getweather');

exports.getLocalData = (req, res, next) => {

    res.locals.meta = {
        charset: 'utf-8',
        description: 'Илон слишком занят'
    };

    res.locals.title = 'Илон слишком занят';
    var weather = getCorrectWeather(getWeather(req.query));
    res.locals.weather = weather;
    next();
};

function getCorrectWeather(data) {
    data.imgSrc =
    `https://www.metaweather.com/static/img/weather/${data.weatherArr[0].weather_state_abbr}.svg`;
    data.weather = data.weatherArr[0].the_temp.toFixed(1);
    data.wind = data.weatherArr[0].wind_speed.toFixed(1);
    let forecast = [];
    data.weatherArr.forEach(elem => {
        forecast.push({
            weather: elem.the_temp.toFixed(1),
            wind: elem.wind_speed.toFixed(1),
            date: getRusTime(elem.applicable_date)
        });
    });

    data.daily = forecast.slice(0, 5);

    return data;
}

function getRusTime(time) {
    var timeObject = new Date(time);
    var months = ['Январь', 'Февраль', 'Марта', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август',
        'Сентябрь', 'Ноябрь', 'Декабрь'];

    return timeObject.getDate() + ' ' + months[timeObject.getMonth()];
}
