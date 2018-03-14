'use strict';

const request = require('request');
const { weatherUrl } = require('../../config');

class Weather {
    static fetch(query) {
        const urlToWoeid = weatherUrl + `search/?query=${query}`;

        return new Promise((resolve, reject) => {
            request.get(urlToWoeid, (error, response, body) => {
                if (body) {
                    resolve(JSON.parse(body));
                } else {
                    reject('err');
                }
            });
        }).then((cityList) => {
            if (cityList[0] !== undefined) {
                const url = weatherUrl + `${cityList[0].woeid}/`;

                return new Promise((resolve, reject) => {
                    request.get(url, (error, response, body) => {
                        body = JSON.parse(body);
                        for (let i = 0; i < body.consolidated_weather.length; i++) {
                            /* eslint camelcase: 0 */
                            const options = { month: 'long', day: 'numeric' };
                            const date = new Date(body.consolidated_weather[i].applicable_date);
                            const formattedDate = date.toLocaleDateString('en-US', options);
                            body.consolidated_weather[i].applicable_date = formattedDate;
                            const temp = body.consolidated_weather[i].the_temp;
                            body.consolidated_weather[i].the_temp = temp.toFixed(1);
                            const wind = body.consolidated_weather[i].wind_speed;
                            body.consolidated_weather[i].wind_speed = wind.toFixed(1);
                        }
                        if (body) {
                            resolve(body);
                        } else {
                            reject('err');
                        }
                    });
                });
            }

            return null;
        });
    }
}

module.exports = Weather;
