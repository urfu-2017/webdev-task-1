const Type = require('union-type')

const NewsCategory = Type({ 
    title: String,
    icon: String,
    urlShortName: String 
})

const NewsItem = Type({ 
    title: String,
    publishedAt: Date,
    description: String,
    source: String,
    category: NewsCategory
})

const WeatherInfo = Type({ 
    city: String
})

module.exports = { NewsCategory, NewsItem, WeatherInfo }
