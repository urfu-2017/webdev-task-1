'use strict';

const moment = require('moment');

const config = require('../config');
const messages = require('../data/messages');
const requests = require('../utils/requests');
const exceptions = require('../utils/exceptions');

const apiUrl = 'https://newsapi.org/v2/top-headlines/';
const requestSettings = {
    method: 'GET',
    headers: {
        Accept: 'application/json',
        'X-Api-Key': config.newsApiKey
    }
};

class News {
    static async filter(category, queryArgs) {
        const country = queryArgs.country || 'ru';

        const response = await requests.jsonRequest(
            `${apiUrl}?category=${category}&country=${country}`,
            requestSettings
        );

        if (response.status !== 200) {
            throw new exceptions.HttpError(messages.remoteServerError, response.status);
        }

        return this._prepareToView(response.body.articles);
    }

    static _prepareToView(news) {
        return news.map(publication => Object.assign({}, publication, {
            publishedAt: moment(publication.publishedAt)
                .locale('ru')
                .format('DD MMMM YYYY, HH:mm')
        }));
    }
}

module.exports = News;
