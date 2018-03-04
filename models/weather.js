const { WeatherInfo } = require('./datatypes')
const MetaWeather = require('metaweather')


class Weather {
    constructor(metaWeather) {
        this.metaWeather = metaWeather
    }

    async getWoeidByQuery(query) {
        const response = await this.metaWeather.search().query(query)
        if (response.body && response.body[0])
            return response.body[0].woeid
    }

    async getWoeidByLocation(lattitude, longitude) {
        const response = await this.metaWeather.search().latLon({ lat: lattitude, lon: longitude })
        if (response.body && response.body[0])
            return response.body[0].woeid
        return null
    }

    async getWeatherByWoeid(woeid) {
        if (woeid) {
            const response = await this.metaWeather.location(woeid)
            if (response.body && response.body.consolidated_weather)
                return response.body.consolidated_weather.map(x => WeatherInfo.WeatherInfoOf({
                    city: response.body.title,
                    weatherState: x.weather_state_abbr,
                    tempCelsius: x.the_temp,
                    windMps: x.wind_speed,
                    day: new Date(x.applicable_date)
                }))
        }
        return null
    }

    async getWeatherByQuery(query) {
        const woeid = await this.getWoeidByQuery(query)
        return await this.getWeatherByWoeid(woeid)
    }

    async getWeatherByLocation(lattitude, longitude) {
        const woeid = await this.getWoeidByLocation(lattitude, longitude)
        return await this.getWeatherByWoeid(woeid)
    }

    static getInstance() {
        return new Weather(new MetaWeather);
    }
}

module.exports = { Weather }
