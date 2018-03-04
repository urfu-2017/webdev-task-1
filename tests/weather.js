'use strict'

const { Weather } = require('../models/weather')
const { WeatherInfo } = require('../models/datatypes')
const assert = require('assert')


describe('weather', () => {
    const sut = Weather.getInstance()

    it('makes query to "london"', async () => {
        const forecasts = await sut.getWeatherByQuery('london')
        const yesterday = new Date(new Date - 24*3600*1000)

        assert.equal(forecasts.length, 6)
        forecasts.forEach(WeatherInfo.case({ 
            WeatherInfo: () => {}, 
            _: () => assert.fail('Thats not a WeatherInfo')
        }))
        assert.equal(forecasts.filter(x => x.day > yesterday).length, 6)
    })

    it('makes query to "San-Fierro"', async () => {
        const forecasts = await sut.getWeatherByQuery('San-Fierro')

        assert.equal(forecasts, null)
    })

    it('makes query to "50.068,-5.316"', async () => {
        const forecasts = await sut.getWeatherByLocation(50.068, -5.316)
        const yesterday = new Date(new Date - 24*3600*1000)

        assert.equal(forecasts.length, 6)
        forecasts.forEach(WeatherInfo.case({ 
            WeatherInfo: () => {}, 
            _: () => assert.fail('Thats not a WeatherInfo')
        }))
        assert.equal(forecasts.filter(x => x.day > yesterday).length, 6)
    })
})