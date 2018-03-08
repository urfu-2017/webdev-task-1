'use strict'

import { NewsItem, NewsCategory } from './datatypes'
import NewsApi from 'newsapi'

export class News {
    constructor(newsApi) {
        this.newsApi = newsApi
    }

    getCategories() {
        return [
            ['business', 'Бизнес'],
            ['entertainment', 'Развлеченie'],
            ['general', 'Генер@л'],
            ['health', 'HP-шка'],
            ['science', 'Науkka'],
            ['sports', 'Спорт'],
            ['technology', 'Технолоgy'],
        ].map(([urlShortName, title]) => NewsCategory.NewsCategoryOf({ urlShortName, title, icon: urlShortName }))
    }

    async getNews(category) {
        const response = await this.newsApi.v2.topHeadlines({ category: category.urlShortName, country: 'ru' })

        return response.articles.map(x => NewsItem.NewsItemOf({
            title: x.title,
            publishedAt: new Date(x.publishedAt),
            description: x.description || '',
            source: x.url,
            imageUrl: x.urlToImage || '',
            category
        }))
    }

    static fromNewsApiKey(keyString) {
        return new News(new NewsApi(keyString))
    }
}
