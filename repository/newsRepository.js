'use strict';

const { getBodyByUrl } = require('./commonRepository');
const News = require('../models/news');

const apiKey = 'ec92adb8527b48ae81a476953bd5c758';
const country = 'ru';
const apiString = 'https://newsapi.org/v2/top-headlines?' +
    `country=${country}&category={{category}}&apiKey=${apiKey}`;
// primer https://newsapi.org/v2/top-headlines?country=ru&apiKey=ec92adb8527b48ae81a476953bd5c758

exports.getNewsByCategory = (category) => {
    const apiURL = category === 'top-headlines'
        ? apiString.replace('{{category}}', '')
        : apiString.replace('{{category}}', category);
    // console.log(apiURL);

    return getBodyByUrl(apiURL)
        .then(
            body => {
                // if (body.status !== 'ok') reject(null);

                return body.articles.map(item => new News(item));
            },
            reject => console.error(reject)
        );
};
