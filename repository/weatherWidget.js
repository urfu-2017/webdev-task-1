'use strict';

const { request } = require('../models/helpers');

const defCity = 'Moscow';
const defWoeId = '2122265';
const baseUrl = 'https://www.metaweather.com/api/';

const parseDate = inpDate => {
    const date = new Date(inpDate);
    const months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня',
        'Июля', 'Августа', 'Сентября', 'Октября', 'Декабря'];

    return date.getDay() + ' ' + months[date.getMonth()];
};

const getWatherForDay = item => {
    const temp = Math.round(item.the_temp);
    const resTemp = temp > 0 ? '+' + temp : temp;

    return {
        temp: resTemp,
        windSpeed: Math.round(item.wind_speed),
        iconAbbr: item.weather_state_abbr,
        date: parseDate(item.applicable_date)
    };
};

const getLocId = async ({ query, lat, lon }) => {
    const searchUrl = baseUrl + 'location/search/';
    let resultUrl = '';

    if (lat && !Number.isNaN(lat) && lon && !Number.isNaN(lon)) {
        resultUrl = searchUrl + `?lattlong=${lat},${lon}`;
    } else {
        resultUrl = searchUrl + `?query=${query || defCity}`;
    }
    const body = await request(resultUrl);
    const woeid = body[0] === undefined ? defWoeId : body[0].woeid;

    return woeid;
};

const getWeather = data => {
    const currentDayData = data.consolidated_weather[0];
    const weatherObject = {
        dataPerDay: data.consolidated_weather.map((item) => {

            return getWatherForDay(item);
        }).splice(1, 5),
        currentDayData: getWatherForDay(currentDayData),
        city: data.title
    };

    return weatherObject;
};

module.exports = async (req, res, next) => {
    const { query, lat, lon } = req.query;
    const locId = await getLocId({ query, lat, lon });
    const apiString = `https://www.metaweather.com/api/location/${locId}/`;
    const body = await request(apiString);

    res.locals.weatherWidget = getWeather(body);

    next();
};
