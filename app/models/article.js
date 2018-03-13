const axios = require('axios');

const config = require('../../config/localhost');

const apiBasePath = config.newsApiBasePath;
const { apiKey } = config;


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
    return axios.get(apiBasePath, { params: { country, category, apiKey } })
      .then(response => response.data.articles);
  }
}

module.exports = Article;
