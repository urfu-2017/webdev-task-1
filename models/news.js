import fetch from 'node-fetch';
import categoriesData from './mocks/newsCategories';

const BASE_URL = 'https://newsapi.org/v2';

export default class NewsAPI {
    static async getNewsAsync({ country = 'ru', category = 'general' }) {
        const newsResponse = await fetch(`${BASE_URL}/top-headlines?` +
            `country=${country}&` +
            `category=${category}&` +
            `apiKey=${process.env.API_KEY}`);

        return await newsResponse.json();
    }
}

export const categories = categoriesData;

export const findCategory = (key) => (categories.find(x => x.key === key));
