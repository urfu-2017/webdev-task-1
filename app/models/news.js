'use strict';
const config = require('../../config');

const apiQuery = require('../libs/api-query');
const { getDateString, getTimeString } = require('../libs/date-formatter');
const filterEmptyParams = require('../libs/filter-empty-params');


class NewsArticle {
    /* eslint-disable max-params */
    constructor(title, text, sourceUrl, image, date) {
        this.title = title;
        this.text = text;
        this.sourceUrl = sourceUrl;
        this.image = image;
        this._date = date;
    }

    get publicationDateIso() {
        return this._date.toISOString();
    }

    get publicationDate() {
        return `${getDateString(this._date)}, ${getTimeString(this._date)}`;
    }

    static fromApiResponse(apiResponse) {
        return new NewsArticle(
            apiResponse.title,
            apiResponse.description,
            apiResponse.url,
            apiResponse.urlToImage,
            new Date(apiResponse.publishedAt)
        );
    }
}


async function _getNews({ language = config.language, country = null, category = null }) {
    const request = { apiKey: config.newsApiKey, language };
    Object.assign(request, filterEmptyParams({ country, category }));
    const apiResponse = await apiQuery(config.newsApiDomain, request);

    return apiResponse.articles
        .map(NewsArticle.fromApiResponse);
}


module.exports = _getNews;
