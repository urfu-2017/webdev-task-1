'use strict';

const dotenv = require('dotenv');
const lru = require('lru-cache');

const configValues = require('../config.json');
const defaultParser = require('./defaultParser');
const defaultValues = dotenv.config('../.env').parsed;
const Forecast = require('../models/weather');

const today = 0;
let cache = lru(configValues.OPTIONS);

async function getWeather(req) {
    let town = req.query.town ? req.query.town : configValues.TOWN_FOR_WEATHER;
    let date = new Date().toLocaleDateString(configValues.DAY_OPTIONS);

    if (!(town in Object.keys(cache) && date === cache[town].weatherToday[0].date)) {
        let urlForForecast = await setUrlForForecast(req);

        let forecast = getObjectForRenderWeather(
            (
                await defaultParser.getResponse(urlForForecast)
            ).consolidated_weather,
            town
        );

        cache.set(
            town,
            {
                weatherToday: forecast.weatherForToday,
                weatherOther: forecast.weatherForWeek
            }
        );
    }

    return cache.get(town);
}

async function setUrlForForecast(req) {
    let location = await getLocation(req);

    return (await defaultParser.setUrl(
        defaultValues.HOST_FOR_WEATHER,
        `${defaultValues.PATHNAME_FOR_WEATHER_IN_TOWN}/${location}`,
        null
    ));
}

async function getLocation(req) {
    return (await defaultParser.getResponse(
        defaultParser.setUrl(
            defaultValues.HOST_FOR_WEATHER,
            defaultValues.PATHNAME_FOR_TOWN_ID,
            {
                query: req.query.town || configValues.TOWN_FOR_WEATHER
            }
        )
    ))[0].woeid;
}

function getObjectForRenderWeather(data, town) {
    let weatherForToday = new Forecast(
        town,
        data[today].applicable_date,
        data[today].the_temp,
        getWeatherPicture(data[today].weather_state_abbr),
        data[today].wind_speed
    );
    let weatherForWeek = [];
    for (let i = 1; i < data.length; i++) {
        weatherForWeek.push(
            new Forecast(
                null,
                data[i].applicable_date,
                data[i].the_temp,
                null,
                data[i].wind_speed
            )
        );
    }

    return { weatherForToday, weatherForWeek };
}


function getWeatherPicture(abbr) {
    return defaultParser.setUrl(
        defaultValues.HOST_FOR_WEATHER,
        `${defaultValues.PATHNAME_FOR_WEATHER_PICTURE}/${abbr}.svg`,
        null
    );
}

module.exports.getWeather = getWeather;
