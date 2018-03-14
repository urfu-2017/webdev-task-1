'use strict';

const rp = require('request-promise');

const config = require('../config.json');


module.exports.News = class {
    static fetch({ country, category }) {
        const urlOptions = {
            uri: config.newsUrl,
            qs: {}
        };
        if (country) {
            urlOptions.qs.country = country;
        } else {
            urlOptions.qs.country = config.abbrDefaultCountry;
        }
        urlOptions.qs.category = category;
        urlOptions.qs.apiKey = config.apiKey;
        Object.assign(urlOptions, config.getRequestOptions);

        return rp(urlOptions)
            .then(result => {
                result.articles.forEach(article => {
                    article.formattedNote = new Date(article.publishedAt)
                        .toLocaleString('en', config.dateFormatOptions);
                });

                return result;
            })
            .catch(() => ({ metaNews: config.pageStatuses.ERROR }));
    }
};
