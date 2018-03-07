const util = require('util');

const request = require('request');

const apiBaseUrl = 'https://www.metaweather.com/api/location'
const apiUrlWoeidData = `${apiBaseUrl}/search/`

class WeatherManager {
    static getWeatherData ({ query, lat, lon }) {
        let params = {};
        if (query != null) {
            params.query = query;
        } else {
            params.lattlong = `${lat},${lon}`;
        }
        return new Promise ((resolve, reject) => {
            request.get(apiUrlWoeidData, { qs: params }, (err, response, body) => {
                if (response.statusCode == 200 && util.isArray(body) && body.length > 0) {
                    let woeidData = body[0].woeidData;
                    request.get(`${apiBaseUrl}/${woeidData}/`, {}, (err, response, body) => {
                        console.log(body);
                    })
                }
            })
        });
    }
}

exports.WeatherManager = WeatherManager;