'use strict';

const request = require('request');
const mounths = [
    'Января', 'Февраля', 'Марта',
    'Апреля', 'Мая', 'Июня',
    'Июля', 'Августа', 'Сентября',
    'Октября', 'Ноября', 'Декабря'];

class Weather {
    constructor(getQuery) {
        this.query = getQuery.query;
        this.urlWeather = 'https://www.metaweather.com/api/location/';
        this.urlImage = 'https://www.metaweather.com/static/img/weather/';
        this.lat = getQuery.lat;
        this.lon = getQuery.lon;
        this.countDay = 5;
        this.weather = {
            weathers: [],
            city: ''
        };
    }

    getWeather() {
        let createQuery = '?';
        if (this.query) {
            createQuery += 'query=' + this.query;
        }
        if (this.lat && this.lon) {
            createQuery += 'lattlong=' + this.lat + ', ' + this.lon;
        }
        if (createQuery === '?') {

            throw Error;
        }
        createQuery = this.urlWeather + 'search/' + createQuery;

        return Weather.requestWeatherId(createQuery)
            .then(answer => {
                this.weather.city = answer[0].title;
                let url = this.urlWeather + answer[0].woeid;

                return Weather.requestWeatherId(url);
            })
            .catch(console.error)
            .then(body => {
                body.consolidated_weather.forEach(weatherOneDay => {
                    let oneDay = {};
                    let date = weatherOneDay.applicable_date.split('-');
                    oneDay.date = Number.parseInt(date[2]) + ' ' +
                        mounths[Number.parseInt(date[1]) - 1];
                    oneDay.weatherStateName = weatherOneDay.weather_state_name;
                    oneDay.weatherStateImage = this.urlImage +
                        weatherOneDay.weather_state_abbr + '.svg';
                    oneDay.windSpeed = Math.round(weatherOneDay.wind_speed * 0.44704);
                    oneDay.temp = Math.round(weatherOneDay.the_temp);
                    this.weather.weathers.push(oneDay);
                });

                return this.weather;
            });
    }

    static requestWeatherId(url) {

        return new Promise((resolve, reject) => {
            request(url, (err, res, body) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(JSON.parse(body));
                }
            });
        });
    }
}

module.exports = Weather;
