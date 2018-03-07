const { News } = require('../models/news')
const { Weather } = require('../models/weather')
const { config } = require('../common')
const news = News.fromNewsApiKey(config.newsApiKey)
const weather = Weather.getInstance()


const forecastMiddleware = async (req, res, next) => {
    const { query, lat, lon } = req.query
    const forecast = await ((lat && lon) ? weather.getWeatherByLocation(lat, lon) : weather.getWeatherByQuery(query))

    req.forecast = forecast || await weather.getWeatherByQuery('vegas')
    next()
}

const index = async (req, res) => {
    const categories = news.getCategories()

    res.render('home', {
        title: 'Главная',
        categories,
        forecast: req.forecast
    })
}

const getCategory = async (req, res) => {
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

module.exports = { forecastMiddleware, index, getCategory }
