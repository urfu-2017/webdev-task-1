const request = require('request');

const apiBasePath = 'https://newsapi.org/v2/top-headlines';
const apiKey = '8f7d1baa6a2745228cedc52c73ddd738';

function getHeadlines(country, category) {
  return new Promise((resolve, reject) => {
    request(
      `${apiBasePath}?country=${country}&category=${category}&apiKey=${apiKey}`,
      (error, response, body) => {
        let articles = null;
        try {
          articles = JSON.parse(body);
        } catch (err) {
          reject(err);
        }
        resolve(articles.articles);
      },
    );
  });
}

class Article {
  constructor(headline) {
    this.source = headline.source.name;
    this.publishDate = headline.publishedAt.slice(0, 10);
    this.title = headline.title;
    this.description = headline.description;
    this.url = headline.url;
    this.urlToImg = headline.urlToImage;
  }

  static get(country, category) {
    return getHeadlines(country, category)
      .then(headlines => headlines.map(headline => new Article(headline)));
  }
}

module.exports = Article;
