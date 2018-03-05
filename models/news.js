import fetch from 'node-fetch';
import config from '../config';

const BASE_URL = 'https://newsapi.org/v2';

export default class NewsAPI {
    static async getNewsAsync({ country = 'ru', category = 'general' }) {
        const newsResponse = await fetch(`${BASE_URL}/top-headlines?` +
            `country=${country}&` +
            `category=${category}&` +
            `apiKey=${config.API_KEY}`);

        return await newsResponse.json();
    }
}

export const categories = [
    { name: 'Бизнес', key: 'business' },
    { name: 'Развлечения', key: 'entertainment' },
    { name: 'Здоровье', key: 'health' },
    { name: 'Наука', key: 'science' },
    { name: 'Спорт', key: 'sports' },
    { name: 'Технологии', key: 'technology' }
];

export const findCategory = (key) => (categories.find(x => x.key === key));
