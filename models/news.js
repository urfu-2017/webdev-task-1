'use strict';

const fetch = require('node-fetch');
const config = require('../config');

const BASE_URL = 'https://newsapi.org/v2';

class NewsAPI {
    static async getNewsAsync({ country = 'ru', category = 'general' }) {
        const newsResponse = await fetch(`${BASE_URL}/top-headlines?` +
            `country=${country}&` +
            `category=${category}&` +
            `apiKey=${config.API_KEY}`);

        return await newsResponse.json();
    }
}


const categories = [
    { name: 'Общее', key: 'general' },
    { name: 'Бизнес', key: 'business' },
    { name: 'Развлечения', key: 'entertainment' },
    { name: 'Здоровье', key: 'health' },
    { name: 'Наука', key: 'science' },
    { name: 'Спорт', key: 'sports' },
    { name: 'Технологии', key: 'technology' }
];

const findCategory = (key) => (categories.find(x => x.key === key));

module.exports = NewsAPI;
module.exports.categories = categories;
module.exports.findCategory = findCategory;
