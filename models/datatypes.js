import Type from 'union-type'

export const NewsCategory = Type({ NewsCategory: {
    title: String,
    icon: String,
    urlShortName: String 
}})

export const NewsItem = Type({ NewsItem: {
    title: String,
    publishedAt: Date,
    description: String,
    source: String,
    imageUrl: String,
    category: NewsCategory
}})

export const WeatherInfo = Type({ WeatherInfo : {
    city: String,
    weatherState: String,
    tempCelsius: Number,
    windMps: Number,
    day: Date
}})
