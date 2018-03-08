const MetaWeather = require('metaweather');
const WeatherInfo = require('../models/weatherInfo');

const weatherClient = new MetaWeather();

class WeatherService {
    constructor () {
        this.woeid = 0;
        this.locationName = "";
    }
    
    async configureLocationByQuery(locationQuery) {
        try{
        const locationInfo = await weatherClient.search().query(locationQuery);
        this.setLocation(locationInfo.body[0].woeid, locationInfo.body[0].title);
        } 
        catch(e){console.error("error" + e);}
    }
    
    async configureLocationByLatLong({lat, long}) {
        const locationInfo = await weatherClient.search().latLon({lat, long});
        this.setLocation(locationInfo.body[0].woeid, locationInfo.body[0].title);
    }
    
    setLocation(woeid, title) {
        this.woeid = woeid;
        this.locationName = title;
    }
    
    async getWeather ()
        {
            const response = await weatherClient.location(this.woeid);
            const forecast = response.body["consolidated_weather"];
            return forecast.map(f => new WeatherInfo(f['weather_state_abbr'], f['the_temp'], f['wind_speed'], f['applicable_date']));
        }
}

module.exports = WeatherService;