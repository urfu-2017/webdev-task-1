import fetch from 'node-fetch';
import config from '../config';

const BASE_URL = config.newsApi.baseUrl;

export default class NewsAPI {
    static async getNewsAsync({ country = 'ru', category = 'general' }) {
        const newsResponse = await fetch(`${BASE_URL}/top-headlines?` +
            `country=${country}&` +
            `category=${category}&` +
            `apiKey=${process.env.API_KEY}`);

        return await newsResponse.json();
    }
}
