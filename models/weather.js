'use strict';

const { format } = require('url');
const path = require('path');

const dotenv = require('dotenv');
const lru = require('lru-cache');
const request = require('request-promise-native');

const defaultValues = dotenv.config({ path: path.join(__dirname, '../.env') }).parsed;
const dayOptions = { year: 'numeric', month: 'long', day: 'numeric' };
const today = 0;
const options = { max: 500,
    maxAge: 1000 * 60 * 60 * 12 };
let cache = lru(options);

class Weather {
    static async getWeather(req) {
        let town = req.query.town ? req.query.town : defaultValues.TOWN_FOR_WEATHER;
        let date = new Date().toLocaleDateString(dayOptions);
        if (!(Object.keys(cache).includes(town) && date === cache[town].weatherToday[0].date)) {
            let location = (await getResponse(
                setUrl(defaultValues.HOST_FOR_WEATHER,
                    defaultValues.PATHNAME_FOR_TOWN_ID,
                    null,
                    { query: req.query.town || defaultValues.TOWN_FOR_WEATHER }
                )))[0].woeid;
            let urlForWeatherinTown = setUrl(defaultValues.HOST_FOR_WEATHER,
                defaultValues.PATHNAME_FOR_WEATHER_IN_TOWN + `/${location}`,
                null);
            let forecast = getObjectForRenderWeather(await getResponse(urlForWeatherinTown));
            let todayWeather = forecast[0];
            let weekWeather = forecast[1];
            cache.set(town, { weatherToday: todayWeather, weatherOther: weekWeather });
        }

        return cache.get(town);
    }
}

function setUrl(host, pathname, kek, params) {
    const url = format({
        protocol: defaultValues.PROTOCOL,
        host,
        pathname,
        query: params
    });

    return url;
}

function getObjectForRenderWeather(data) {
    let forecast = data.consolidated_weather;
    let objectForRenderTodayWeather = [];
    let objectForRenderWeekWeather = [];
    objectForRenderTodayWeather.push({ town: data.title,
        weather: getWeatherPicture(forecast[today].weather_state_abbr),
        date: new Date(forecast[today].applicable_date).toLocaleDateString(dayOptions),
        temp: Math.round(forecast[today].the_temp)
    });

    for (let i = 1; i < forecast.length; i++) {
        objectForRenderWeekWeather.push({ temp: Math.round(forecast[i].the_temp),
            windSpeed: Math.round(forecast[i].wind_speed),
            date: new Date(forecast[today].applicable_date)
                .toLocaleDateString(dayOptions) });
    }

    return [objectForRenderTodayWeather, objectForRenderWeekWeather];
}

function getWeatherPicture(abbr) {
    return setUrl(defaultValues.HOST_FOR_WEATHER,
        defaultValues.PATHNAME_FOR_WEATHER_PICTURE + `/${abbr}.svg`,
        null
    );
}

function getResponse(url) {
    return request(url)
        .then(response => JSON.parse(response))
        .catch(err => err);
}

module.exports = Weather;
