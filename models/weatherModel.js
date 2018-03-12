'use strict';

const dateformat = require('dateformat');
const got = require('got');

module.exports = class Weather {
    constructor({ query, lat, lon }) {
        this.query = query;
        this.lat = lat;
        this.lon = lon;
    }

    getWeather() {
        return this.getWoeid()
            .then(res => JSON.parse(res.body)[0].woeid)
            .then(this.find)
            .then(this.formatWeather);
    }

    formatWeather(data) {
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

    getWoeid() {
        if (this.query) {
            return got(
                'https://www.metaweather.com/api/location/search/',
                { query: { query: this.query } }
            );
        }
        if (this.lat && this.lon) {
            return got(
                'https://www.metaweather.com/api/location/search/',
                { query: { lattlon: `${this.lat},${this.lon}` } }
            );
        }

        return got(
            'https://www.metaweather.com/api/location/search/',
            { query: { query: 'london' } }
        );
    }

    find(woeid) {
        return got('https://www.metaweather.com/api/location/' + woeid);
    }

};
