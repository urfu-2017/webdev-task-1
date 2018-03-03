const { NewsItem, NewsCategory } = require('./datatypes')

class News {
    constructor(newsApi) {
        this.newsApi = newsApi
    }

    getCategories() {
        return []
    }   
    
    getNews(category, page=0) {
        return []
    }
}

module.exports = { News }
