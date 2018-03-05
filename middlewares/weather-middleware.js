/* eslint-disable */

'use strict';

const request = require('request');
const baseUrl = 'https://www.metaweather.com/api/';
const defaultCity = 'Moscow';

const getLocationId = ({ query, lat, lon }) => new Promise((resolve, reject) => {
    let url = null;

    if (query) {
        url = baseUrl + `location/search/?query=${query}`;
    } else if (lat && !Number.isNaN(lat) && lon && !Number.isNaN(lon)) {
        url = baseUrl + `location/search/?lattlong=${lat},${lon}`
    } else {
        url = baseUrl + `location/search/?query=${defaultCity}`;
    }

    request(url, (err, response, body) => {
        if (err) {
            reject(new Error('Request failed'));
            return;
        }

        body = JSON.parse(body);

        if (Array.isArray(body) && body[0] && body[0].woeid) {
            resolve(body[0].woeid);
            return;
        }

        reject(new Error('Response no data'));
    });
});

const getWeather = placeId => new Promise((resolve, reject) => {
    request(baseUrl + `/location/${placeId}`, (err, response, body) => {
        if (err) {
            reject(new Error('Request failed'));
            return;
        }

        resolve(JSON.parse(body));
    });
});

const formatDate = date => {
    const monthNames = [
        "Jan", "Feb", "Mar", "Apr",
        "May", "Jun", "Jul", "Aug",
        "Sep", "Oct", "Nov", "Dec"
      ];
    const newDate = new Date(date);
    return monthNames[parseInt(newDate.getMonth())] + ' ' + newDate.getDate();
}

module.exports = (req, res, next) => {
    console.info(req.path);

    if (req.query) {
        const { query, lat, lon } = req.query;
        getLocationId({ query, lat, lon })
            .then(id => getWeather(id))
            .then(data => {
                // сделать функцию, которая будет приводить дату в человеческий вид
                res.locals.city = data.title;
                res.locals.image = data.consolidated_weather[0].weather_state_abbr;
                res.locals.tempToday = parseInt(data.consolidated_weather[0].the_temp);
                res.locals.windToday = parseInt(data.consolidated_weather[0].wind_speed);
                res.locals.date1 = formatDate(data.consolidated_weather[1].applicable_date);
                res.locals.date2 = formatDate(data.consolidated_weather[2].applicable_date);
                res.locals.date3 = formatDate(data.consolidated_weather[3].applicable_date);
                res.locals.date4 = formatDate(data.consolidated_weather[4].applicable_date);
                res.locals.date5 = formatDate(data.consolidated_weather[5].applicable_date);
                res.locals.temp1 = parseInt(data.consolidated_weather[1].the_temp);
                res.locals.temp2 = parseInt(data.consolidated_weather[2].the_temp);
                res.locals.temp3 = parseInt(data.consolidated_weather[3].the_temp);
                res.locals.temp4 = parseInt(data.consolidated_weather[4].the_temp);
                res.locals.temp5 = parseInt(data.consolidated_weather[5].the_temp);
                res.locals.wind1 = parseInt(data.consolidated_weather[1].wind_speed);
                res.locals.wind2 = parseInt(data.consolidated_weather[2].wind_speed);
                res.locals.wind3 = parseInt(data.consolidated_weather[3].wind_speed);
                res.locals.wind4 = parseInt(data.consolidated_weather[4].wind_speed);
                res.locals.wind5 = parseInt(data.consolidated_weather[5].wind_speed);
                
                next();
            })
            .catch(error => {
                console.error(error);
                next();
            });
    }
};