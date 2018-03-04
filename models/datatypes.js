const Type = require('union-type')

const NewsCategory = Type({ NewsCategory: {
    title: String,
    icon: String,
    urlShortName: String 
}})

const NewsItem = Type({ NewsItem: {
    title: String,
    publishedAt: Date,
    description: String,
    source: String,
    category: NewsCategory
}})

const WeatherInfo = Type({ WeatherInfo : {
    city: String,
    weatherState: String,
    tempCelsius: Number,
    windMps: Number,
    day: Date
}})

module.exports = { NewsCategory, NewsItem, WeatherInfo }
