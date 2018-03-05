'use strict';

const moment = require('moment');

const { promiseError } = require('../utils');
const { ERRORS } = require('../const');
const data = require('../data.json');
const api = require('../api');

module.exports = class News {
    static find(country, url) {
        const categoryInfo = data.categories.find(i => i.url === url);
        if (!url || !categoryInfo) {
            return promiseError(ERRORS.NO_SUCH_CATEGORY);
        }
        if (!country) {
            return promiseError(ERRORS.NO_COUNTRY);
        }

        return api.getNewsByCategory(country, categoryInfo.category)
            .then(News.getNewsBySearchData, { error: ERRORS.CANT_LOCATE });
    }

    static getNewsBySearchData(res) {
        try {
            return res.data.articles.map(i => {
                i.publishedAt = moment(i.publishedAt).format('DD.MM.YYYY');

                return i;
            });
        } catch (e) {
            return { error: ERRORS.CANT_LOCATE };
        }

    }
};
