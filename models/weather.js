'use strict';

const axios = require('axios');
const config = require('config');

const windSpeedCoefficient = 0.44704;

class Weather {
    constructor({ query = 'Moscow', lat, lon }) {
        this.query = query;
        this.lattlong = lat && lon ? lat + ',' + lon : undefined;
        this.data = {
            weatherList: [],
            city: ''
        };
    }

    get() {

        return Weather.requestWeatherId(config.get('urlWeather') + 'search/', this)
            .then(answer => {
                let woeid = '';
                if (answer.data && answer.data.length) {
                    this.data.city = answer.data[0].title;
                    woeid += answer.data[0].woeid;
                }

                return Weather.requestWeatherId(config.get('urlWeather') + woeid, {});
            })
            .then(body => {
                if (!body.data) {
                    this.data = null;

                    return this.data;
                }
                body.data.consolidated_weather.forEach(weatherOneDay => {
                    const oneDay = {};
                    const options = { month: 'long', day: 'numeric' };
                    const date = new Date(weatherOneDay.applicable_date);
                    oneDay.date = date.toLocaleDateString('ru-Ru', options);
                    oneDay.weatherStateName = weatherOneDay.weather_state_name;
                    oneDay.weatherStateImage = config.get('urlWeatherImage') +
                        weatherOneDay.weather_state_abbr + '.svg';
                    oneDay.windSpeed = Math.round(weatherOneDay.wind_speed * windSpeedCoefficient);
                    oneDay.temp = Math.round(weatherOneDay.the_temp);
                    this.data.weatherList.push(oneDay);
                });

                return this.data;
            });
    }

    static requestWeatherId(url, { query, lattlong }) {

        return axios.get(url, { params: { query, lattlong } });
    }
}

module.exports = Weather;
