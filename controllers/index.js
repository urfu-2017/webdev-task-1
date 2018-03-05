const { News } = require('../models/news')
const { Weather } = require('../models/weather')
const news = News.fromNewsApiKey('af406ce76d00443f90f40b9a2e5f2da4')
const weather = Weather.getInstance()


const forecastMiddleware = async (req, res, next) => {
    const { query, lat, lon } = req.query
    if (!query && (!lat || !lon))
        res.redirect('?query=london')
    else {
        const forecast = await (query ? weather.getWeatherByQuery(query) : weather.getWeatherByLocation(lat, lon))

        if (forecast === null && query !== 'london')
            res.redirect('?query=london')
        else {
            req.forecast = forecast
            next()
        }
    }
    
}

const index = async (req, res) => {
    const categories = news.getCategories()

    res.render('home', {
        title: 'main page',
        categories,
        forecast: req.forecast
    })
}

const getCategory = async (req, res) => {
    const { categoryName } = req.params
    const [category] = news.getCategories().filter(x => x.urlShortName === categoryName)

    if (category) {
        const news = await news.getNews(category)

        res.render('category',  {
            title: category.title,
            forecast: req.forecast,
            category: category,
            news
        })
    }
    else res.send(404)
}

module.exports = { forecastMiddleware, index, getCategory }
