'use strict';

const { getResponse } = require('./sendResponse');
const config = require('config');
const { URL, URLSearchParams } = require('url');

let townForWeather = config.townForWeather;
let urlForWeatherPic = new URL(config.urlForWeatherPic);
let cache = {};
let dayOptions = { year: 'numeric', month: 'long', day: 'numeric' };
let today = 0;

module.exports.getWeather = async req => {
    let forecastToday = [];
    let forecastOther = [];
    let town = req.query.town ? req.query.town : townForWeather;
    let date = new Date().toLocaleDateString('en-US', dayOptions);
    if (!(Object.keys(cache).includes(town) && date === cache[town].weatherToday[0].date)) {
        let urlTownId = new URL(config.urlTownId);
        let urlForWeatherinTown = new URL(config.urlForWeatherinTown);
        urlTownId.searchParams.append('query', town);
        let location = await getResponse(urlTownId.href);
        urlForWeatherinTown.href += location[0].woeid;
        let forecast = getObjectForRenderWeather(await getResponse(urlForWeatherinTown.href));
        let todayWeather = forecast[0];
        let weekWeather = forecast[1];
            cache[town] = { weatherToday: todayWeather, weatherOther: weekWeather };
    }

    return cache[town];
}

function getObjectForRenderWeather(data) {
    let town = data.title;
    let forecast = data.consolidated_weather;
    let objectForRenderTodayWeather = [];
    let objectForRenderWeekWeather = [];
    objectForRenderTodayWeather.push({ town: town, weather: getWeatherPicture(forecast[today].weather_state_abbr), 
        wind_direction: forecast[today].wind_direction_compass,
        date: new Date(forecast[today].applicable_date).toLocaleDateString('en-US', dayOptions),
        temp: Math.round(forecast[today].the_temp), wind_speed: Math.round(forecast[today].wind_speed),
        air: Math.round(forecast[today].air_pressure),
        humidity: forecast[today].humidity });

    for (let i = 1; i < forecast.length; i++) {
        let applicable_date = forecast[i].applicable_date;
        let wind_direction = forecast[i].wind_direction_compass;
        let the_temp = Math.round(forecast[i].the_temp);
        let wind_speed = Math.round(forecast[i].wind_speed);
        objectForRenderWeekWeather.push({ wind_direction: forecast[i].wind_direction_compass,
            date: new Date(forecast[i].applicable_date).toLocaleDateString('en-US', dayOptions),
            temp: the_temp, wind_speed: wind_speed});
    }

    return [objectForRenderTodayWeather, objectForRenderWeekWeather];
}

function getWeatherPicture(abbr) {
    return `${urlForWeatherPic}${abbr}.svg`;
}
