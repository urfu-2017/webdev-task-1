'use strict'

const { Weather } = require('../models/weather')
const { WeatherInfo } = require('../models/datatypes')
const assert = require('assert')
const moment = require('moment')
const { checkType } = require('../common')


describe('weather', () => {
    const sut = Weather.getInstance()
    const yesterday = moment().subtract(1, 'day').toDate()

    it('makes query to "london"', async () => {
        const forecasts = await sut.getWeatherByQuery('london')

        assert.equal(forecasts.length, 6)
        
        forecasts.forEach(checkType(WeatherInfo, 'WeatherInfo'))
        assert.equal(forecasts.filter(x => x.day > yesterday).length, 6)
    })

    it('makes query to "San-Fierro"', async () => {
        const forecasts = await sut.getWeatherByQuery('San-Fierro')

        assert.equal(forecasts, null)
    })

    it('makes query to "50.068,-5.316"', async () => {
        const forecasts = await sut.getWeatherByLocation(50.068, -5.316)

        assert.equal(forecasts.length, 6)
        forecasts.forEach(checkType(WeatherInfo, 'WeatherInfo'))
        assert.equal(forecasts.filter(x => x.day > yesterday).length, 6)
    })
})