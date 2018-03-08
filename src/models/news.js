'use strict';

const settings = require('../settings');
const requests = require('../utils/requests');
const apiUrl = 'https://newsapi.org/v2/top-headlines/';

const requestSettings = {
    method: 'GET',
    headers: {
        Accept: 'application/json',
        'X-Api-Key': settings.newsApiKey
    }
};

class News {
    static async filter(category = 'general', queryArgs = { country: 'ru' }) {
        // node-fetch не принимает параметр qs в настройках :(
        const response = await requests.jsonRequest(
            `${apiUrl}?category=${category}&country=${queryArgs.country}`,
            requestSettings
        );

        if (response.status !== 200) {
            throw new Error('Не удалось получить новости с удалённого сервера.');
        }

        return response.body;
    }
}

module.exports = News;
