'use strict';

const dateformat = require('dateformat');
const { getWoeid, getWeather } = require('./api.js');

module.exports = class Weather {
    static getWeather(query) {
        return getWoeid(query)
            .then(res => JSON.parse(res.body)[0].woeid)
            .then(getWeather)
            .then(Weather.formatWeather);
    }

    static formatWeather(data) {
        const JSONdata = JSON.parse(data.body);
        let answer = {
            days: [],
            city: JSONdata.title
        };

        JSONdata.consolidated_weather.forEach(day => {
            answer.days.push({
                temp: Math.round(day.the_temp),
                wind: Math.round(day.wind_speed),
                date: dateformat(day.applicable_date, 'mmmm dS'),
                icon: day.weather_state_abbr
            });
        });

        return answer;
    }
};
