'use strict'
const express = require('express')
const exphbs  = require('express-handlebars')
const { forecastMiddleware, index, getCategory } = require('./controllers/index')
const { wrap } = require('async-middleware')
const moment = require('moment')

const displayRussianDate = date => moment(date).locale('ru').format('Do MMMM')
const mwStateToIcon = state => 'icofont-' + ({
    sn: 'snowy',
    sl: 'snowy-rainy',
    h: 'hail',
    t: 'rainy-thunder',
    hr: 'rainy',
    lr: 'rainy',
    s: 'rainy-sunny',
    hc: 'clouds',
    lc: 'cloudy',
    c: 'sun-alt'
}[state])
const head = list => list[0]
const tail = list => list.slice(1)
const round = (digits, number) => number.toFixed(digits)

const fmtTemp = temp => (temp == 0 ? '0' : ((temp > 0 ? '+' : '-') + temp.toFixed(1))) + ' ℃'
const fmtWind = wind => `${wind.toFixed(2)} м/c`


const app = express()
app.engine('hbs', exphbs({ 
    extname: '.hbs',
    defaultLayout: 'html5',
    helpers: { displayRussianDate, head, tail, mwStateToIcon, fmtTemp, fmtWind } 
}))
app.set('view engine', 'hbs')
app.locals.siteName = 'Local Extremum'
app.use(express.static('public'))

app.use(wrap(forecastMiddleware))
app.get('/', wrap(index))
app.get('/:category', wrap(getCategory))

module.exports = app

if (require.main === module) {
    app.listen(8080, () => console.log('Running on localhost:8080'))
}
