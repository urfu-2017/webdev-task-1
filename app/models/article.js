const axios = require('axios');

const { newsApiKey, newsApiBasePath } = require('../../config');

class Article {
  constructor(headline) {
    this.source = headline.source.name;
    this.publishDate = headline.publishedAt.slice(0, 10);
    this.title = headline.title;
    this.description = headline.description;
    this.url = headline.url;
    this.urlToImg = headline.urlToImage;
  }


  static get({ country, category }) {
    return Article.fetch(country, category)
      .then(headlines => headlines.map(headline => new Article(headline)));
  }

  static fetch(country, category) {
    return axios.get(newsApiBasePath, { params: { country, category, apiKey: newsApiKey } })
      .then(response => response.data.articles);
  }
}

module.exports = Article;
