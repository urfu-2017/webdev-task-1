'use strict';

const { getParceBody } = require('./commonRepository');

// primer https://www.metaweather.com/api/location/44418/

const defCity = 'Moscow';
const defWoeid = '2122265';
const baseUrl = 'https://www.metaweather.com/api/';

const getLocId = async ({ query, lat, lon }) => {
    const searchUrl = baseUrl + 'location/search/';
    let resultUrl = '';

    if (lat && !Number.isNaN(lat) && lon && !Number.isNaN(lon)) {
        resultUrl = searchUrl + `?lattlong=${lat},${lon}`;
    } else {
        resultUrl = searchUrl + `?query=${query || defCity}`;
    }
    const body = await getParceBody(resultUrl);
    const woeid = body[0] === undefined ? defWoeid : body[0].woeid;

    return woeid;
};

const getWeather = data => {
    const currentDayData = data.consolidated_weather[0];
    const weatherObject = {
        dataPerDay: data.consolidated_weather.map((item) => {

            return {
                temp: Math.round(item.the_temp),
                windSpeed: Math.round(item.wind_speed),
                iconAbbr: item.weather_state_abbr,
                date: item.applicable_date
            };
        }).splice(1, 5),
        currentDayData: {
            temp: Math.round(currentDayData.the_temp),
            windSpeed: Math.round(currentDayData.wind_speed),
            iconAbbr: currentDayData.weather_state_abbr,
            date: currentDayData.applicable_date
        },
        city: data.title
    };

    return weatherObject;
};

module.exports = async (req, res, next) => {
    const { query, lat, lon } = req.query;
    const locId = await getLocId({ query, lat, lon });
    const apiString = `https://www.metaweather.com/api/location/${locId}/`;
    const body = await getParceBody(apiString);

    res.locals.weatherWidget = getWeather(body);

    next();
};

