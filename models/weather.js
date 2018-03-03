const { WeatherInfo } = require('./datatypes')


class Weather {
    constructor(metaWeather) {
        this.metaWeather = metaWeather
    }

    getWeatherByQuery(query) {
        return WeatherInfo.WeatherInfoOf({  });
    }

    getWeatherByLocation(lattitude, longitude) {
        return WeatherInfo.WeatherInfoOf({  });
    }
}

module.exports = { Weather }
