'use strict';

const axios = require('axios');
const moment = require('moment');
const { URLS } = require('./const');

module.exports = {
    promiseError: error => new Promise(resolve => resolve({ error })),
    getWeatherBySearchData: ({ data }) => axios.get(`${URLS.weather}${data[0].woeid}`)
        .then(res => ({
            city: res.data.title,
            forecast: res.data.consolidated_weather.map(i => ({
                temp: Math.round(i.the_temp),
                wind: Math.round(i.wind_speed),
                date: moment(i.applicable_date).format('DD.MM')
            })),
            imgAbbr: res.data.consolidated_weather[0].weather_state_abbr
        })),
    findCategoryName: (categories, category) => {
        const res = categories.find(i => i.category === category);

        return res ? res.name : null;
    },
    getNewsBySearchData: ({ data }) => data.articles.map(i => {
        i.publishedAt = moment(i.publishedAt).format('DD.MM.YYYY');

        return i;
    })
};
