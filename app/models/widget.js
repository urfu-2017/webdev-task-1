'use strict';

const request = require('request');
const cities = require('all-the-cities');

const apiBasePath = 'https://www.metaweather.com/api/location/';
const monthMap = {
    1: 'января',
    2: 'февраля',
    3: 'марта',
    4: 'апреля',
    5: 'мая',
    6: 'июня',
    7: 'июля',
    8: 'августа',
    9: 'сентября',
    10: 'октября',
    11: 'ноября',
    12: 'декабря'
};

class Widget {
    constructor({ title, countryCode, forecast }) {
        this.countryCode = countryCode;
        this.city = title;
        this.currentDayTemp = forecast[0].temperature;
        this.currentDayWind = forecast[0].wind;
        this.currentDayWeatherType = forecast[0].weatherType;
        forecast.shift();
        this.weatherForecast = forecast;
    }

    static build(cityName) {
        if (!cityName) {
            cityName = 'Moscow';
        }

        return getWeatherReport(cityName).then((weatherReport) => {
            return new Widget(formatReport(weatherReport));
        });
    }
}

function getWeatherReport(cityName) {
    return new Promise((resolve, reject) => {
        request(apiBasePath + 'search/?query=' + cityName, (error, response, body) => {
            let woeid = 0;
            try {
                woeid = JSON.parse(body)[0].woeid;
            } catch (err) {
                reject();
            }
            resolve(woeid);
        });
    }).then(woeid => {
        return new Promise((resolve, reject) => {
            request(apiBasePath + woeid, (error, response, body) => {
                try {
                    resolve(JSON.parse(body));
                } catch (err) {
                    reject(err);
                }
            });
        }).then(data => {
            return data;
        })
            .catch(err => {
                return err;
            });
    });
}

function formatReport(weatherReport) {
    return {
        title: weatherReport.title,
        countryCode: cities.filter(city => {
            return city.name.match(weatherReport.title);
        })[0].country.toLowerCase(),
        forecast:
            weatherReport.consolidated_weather.map((report) => {
                const splitDate = report.applicable_date.split('-');
                const date = parseInt(splitDate[2]) + ' ' + monthMap[parseInt(splitDate[1])];

                let temperature = parseInt(report.the_temp);
                if (temperature > 0) {
                    temperature = '+' + temperature;
                }

                return {
                    date: date,
                    wind: parseInt(report.wind_speed),
                    temperature: temperature,
                    weatherType: report.weather_state_abbr
                };
            })
    };
}

module.exports = Widget;
