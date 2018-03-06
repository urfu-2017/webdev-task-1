import fetch from 'node-fetch';
import config from '../config';
import categoriesData from './mocks/newsCategories';

const BASE_URL = 'https://newsapi.org/v2';

export default class NewsAPI {
    static async getNewsAsync({ country = 'ru', category = 'general' }) {
        if (config.API_KEY) {
            const newsResponse = await fetch(`${BASE_URL}/top-headlines?` +
                `country=${country}&` +
                `category=${category}&` +
                `apiKey=${config.API_KEY}`);

            return await newsResponse.json();
        }

        return {};
    }
}

export const categories = categoriesData;

export const findCategory = (key) => (categories.find(x => x.key === key));
