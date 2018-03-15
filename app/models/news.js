import config from '../../config';

import apiQuery from '../libs/api-query';
import { getDateString, getTimeString } from '../libs/date-formatter';
import filterEmptyParams from '../libs/filter-empty-params';


class NewsArticle {
    constructor(...params) {
        [
            this.title,
            this.text,
            this.sourceUrl,
            this.image,
            this._date
        ] = params;
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
    const request = { apiKey: config.newsApi.key, language };
    Object.assign(request, filterEmptyParams({ country, category }));
    const apiResponse = await apiQuery(config.newsApi.url, request);

    return apiResponse.articles
        .map(NewsArticle.fromApiResponse);
}


export default _getNews;
