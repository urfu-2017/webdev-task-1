'use strict'
const express = require('express')
const exphbs  = require('express-handlebars')
const { forecastMiddleware, index, getCategory } = require('./controllers/index')
const { wrap } = require('async-middleware')
const { config, handlebarsHelpers } = require('./common')


const app = express()
app.engine('hbs', exphbs({ 
    extname: '.hbs',
    defaultLayout: 'html5',
    helpers: handlebarsHelpers
}))
app.set('view engine', 'hbs')
app.locals.siteName = config.siteName
app.use(express.static('public'))

app.use(wrap(forecastMiddleware))
app.get('/', wrap(index))
app.get('/:category', wrap(getCategory))

module.exports = app

if (require.main === module) {
    app.listen(8080, () => console.log('Running on localhost:8080'))
}
