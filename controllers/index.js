const { News } = require('../models/news')
const { Weather } = require('../models/weather')
const news = News.fromNewsApiKey('af406ce76d00443f90f40b9a2e5f2da4')
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
    const [category] = news.getCategories().filter(x => x.urlShortName === categoryShortName)

    if (category) {
        const newsItems = await news.getNews(category)

        res.render('category',  {
            title: category.title,
            forecast: req.forecast,
            category: category,
            news: newsItems
        })
    }
    else res.sendStatus(404)
}

module.exports = { forecastMiddleware, index, getCategory }
