'use strict';

const { newsFetcher } = require('../utils/news');

class News {
    constructor({ title, description, link, date, source, image }) {
        this.title = title;
        this.description = description;
        this.date = date;
        this.source = source;
        this.image = image;
        this.link = link;
    }

    static async getNews(category, country) {
        const articles = await newsFetcher.getNews(category, country);
        if (articles.error) {
            return articles;
        }
        const news = articles.reduce((result, current) => {
            const params = {
                title: current.title,
                description: current.description,
                link: current.url,
                date: current.publishedAt,
                source: current.source.name,
                image: current.urlToImage
            };
            const article = new News(params);
            result.push(article);

            return result;
        }, []);

        return news;
    }
}

exports.News = News;
