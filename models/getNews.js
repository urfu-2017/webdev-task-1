const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('22e0046e75c54aebb1edc07de4ce08c4');

const topHeadlines = (category, country = 'ru', language = 'ru') => newsapi.v2.topHeadlines({
    sortBy: 'popularity',
    category: category,
    language: language,
    country: country
});

const getNews = (category) => {
    return topHeadlines(category)
        .then(catNews => catNews);
};

module.exports = getNews;
