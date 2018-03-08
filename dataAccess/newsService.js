const NewsApi = require('newsapi');

const newsClient = new NewsApi('2eef427492534f2eb16daae98202528b');
let choosedCountry = "ru";

class NewsService {
    constructor () { }
    
    static setCountry (country) {
        choosedCountry = country;
    }
    
    async getByCategory (category)
        {
            const newsResponse = await newsClient.v2.topHeadlines({
                category: category.name, 
                country: choosedCountry
            });
            
            return newsResponse.status == 'ok' 
                ? newsResponse.articles 
                : [];
        }
}

module.exports = NewsService;