const fetch = require('node-fetch');

const getWeather = (myLocation) => {
    return fetch(`https://www.metaweather.com/api/location/search/?query=${myLocation}`)
        .then(response => response.json())
        .then(body => body[0].woeid)
        .then(woeid => fetch(`https://www.metaweather.com/api/location/${woeid}/`))
        .then(response => response.json());
};

module.exports = getWeather;

