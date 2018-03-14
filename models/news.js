'use strict';

import NewsAPI from 'newsapi';
import config from '../config';

const newsapi = new NewsAPI(config.apiKey);

class NewsManager {
    static async findByCategory(name) {
        return newsapi.v2.topHeadlines({
            category: name,
            language: config.language,
            country: config.language
        });
    }
}

exports.NewsManager = NewsManager;
