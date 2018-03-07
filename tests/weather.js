'use strict'

import { Weather } from '../models/weather'
import { WeatherInfo } from '../models/datatypes'
import assert from 'assert'
import moment from 'moment'
import { checkType } from '../common'


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

        assert.ok(forecasts === undefined)
    })

    it('makes query to undefined', async () => {
        const forecasts = await sut.getWeatherByQuery({}[1])

        assert.ok(forecasts === undefined)
    })

    it('makes query to "50.068,-5.316"', async () => {
        const forecasts = await sut.getWeatherByLocation(50.068, -5.316)

        assert.equal(forecasts.length, 6)
        forecasts.forEach(checkType(WeatherInfo, 'WeatherInfo'))
        assert.equal(forecasts.filter(x => x.day > yesterday).length, 6)
    })
})