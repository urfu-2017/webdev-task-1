'use strict';

const WetherModel = require('../models/weather');
const url = require('url');
const linkObj = require('../mocks/config');
const link = url.format(linkObj);
const BASE_LONDON_ID = 44418;
const SEARCH_PATH = 'search/';

exports.getWeather = (query) => {

    /*  
        linkObj.pathname += "search/";
        linkObj.search = `?query=${city}`;
        let link = url.format(linkObj); 
        получается удобно для первого запроса, но не для остальных
    */
    let city = query.query;
    let search = `?query=${city}`;
    let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
    let xhr = new XMLHttpRequest();
    if (city) {
        xhr.open('GET', `${link}${SEARCH_PATH}${search}`, false);
        xhr.send();
        if (JSON.parse(xhr.responseText)[0] !== undefined) {
            let cityId = JSON.parse(xhr.responseText)[0].woeid;
            xhr.open('GET', `${link}${cityId}/`, false);
            xhr.send();

            return correctWeather(JSON.parse(xhr.responseText));
        }
    }
    xhr.open('GET', `${link}${BASE_LONDON_ID}/`, false);
    xhr.send();

    return correctWeather(JSON.parse(xhr.responseText));
};

function correctWeather(data) {
    let city = data.title;
    let weather = [];
    data.consolidated_weather.forEach(element => {
        weather.push(new WetherModel (
            {
                city,
                temp: element.the_temp,
                wind: element.wind_speed,
                date: element.applicable_date,
                abbr: element.weather_state_abbr
            }
        ));
    });

    return weather;
}

