const data = require('../data');
const weather = require('../models/weather');

exports.list = (req, res) => {
    weather.WeatherManager.getWeatherData({query: 'london'}).then((response) => {
        // console.log(response.toJSON());
    });
    res.render('categories', {
        title: 'Илон слишком занят',
        categories: data.categories
    });
}