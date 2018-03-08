'use strict'

import { News } from '../models/news'
import { Weather } from  '../models/weather'
import { config } from  '../common'
const news = News.fromNewsApiKey(config.newsApiKey)
const weather = Weather.getInstance()

export const forecastMiddleware = async (req, res, next) => {
    const { query, lat, lon } = req.query
    const hasPosition = lat && lon

    if (hasPosition)
        req.forecast = weather.getWeatherByLocation(lat, lon)
    else if (query)
        req.forecast = weather.getWeatherByQuery(query)

    req.forecast = req.forecast || await weather.getWeatherByQuery('vegas')
    next()
}

export const index = async (req, res) => {
    const categories = news.getCategories()

    res.render('home', {
        title: 'Главная',
        categories,
        forecast: req.forecast
    })
}

export const getCategory = async (req, res) => {
    const categoryShortName = req.params.category
    const category = news.getCategories().find(x => x.urlShortName === categoryShortName)

    if (!category) {
        res.sendStatus(404)
        return
    }

    const newsItems = await news.getNews(category)
    res.render('category',  {
        title: category.title,
        forecast: req.forecast,
        category: category,
        news: newsItems
    })
}
