'use strict'

import express from 'express'
import exphbs from 'express-handlebars'
import { forecastMiddleware, index, getCategory } from './controllers/index'
import { wrap } from 'async-middleware'
import { config, handlebarsHelpers } from './common'


export const app = express()
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
