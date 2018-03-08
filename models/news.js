'use strict';

const moment = require('moment');
const NewsApi = require('newsapi');
const newsapi = new NewsApi(process.env.NEWSAPI_TOKEN);

module.exports = class News {
    constructor({ title, description, publishedAt, url, source, urlToImage }) {
        this.title = title;
        this.description = description;
        this.publicationTime = publishedAt;
        this.formattedPublicationTime = moment(this.publicationTime).format('DD-MM-YYYY');
        this.sourceUrl = url;
        this.imageUrl = urlToImage;
        this.source = source.name;
    }

    static async getNews(category, country) {
        const response = await newsapi.v2.topHeadlines({ category, country });

        return response.articles.map(article => new News(article));
    }
};
