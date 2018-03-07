'use strict';
const querystring = require('querystring');

const config = require('../../config');
const weather = require('../models/weather');
const news = require('../models/news');


const _transformQuery = (query, category) => {
    let result = null;
    if (!query.query && (!query.lat || !query.lon)) {
        result = config.defaultQuery;
    } else {
        result = query.query
            ? query
            : {
                lattlong: `${query.lat},${query.lon}`,
                country: query.country
            };
    }

    if (category) {
        Object.assign(result, { category });
    }

    return result;
};


const NEWS_CATEGORIES = {
    'business': 'Бизнес',
    'entertainment': 'Развлечения',
    'general': 'Общее',
    'health': 'Здоровье',
    'science': 'Наука',
    'sports': 'Спорт',
    'technology': 'Технологии'
};


const index = async (req, res) => {
    const query = _transformQuery(req.query);
    const weatherPromise = weather(query);

    await new Promise(async (resolve, reject) => {
        setTimeout(() => reject(), config.apiRequestTimeout);
        await weatherPromise
            .catch(() => reject());
        resolve();
    });

    const data = await weatherPromise;
    data.categories = Object.entries(NEWS_CATEGORIES)
        .map(entry => ({
            categoryEn: entry[0],
            categoryRu: entry[1],
            categoryLink: entry[0] + req.originalUrl
        }));
    res.render('index', data);
};


const newsCategory = async (req, res) => {
    const query = _transformQuery(req.query, req.params.category);
    const weatherPromise = weather(query);
    const newsPromise = news(query);

    await new Promise(async (resolve, reject) => {
        setTimeout(() => reject(), config.apiRequestTimeout);
        await Promise.all([weatherPromise, newsPromise])
            .catch(() => reject());
        resolve();
    });

    const data = await weatherPromise;
    data.articles = await newsPromise;

    const originalQuery = Object.assign({}, req.query);
    Object.keys(req.params).map(p => delete originalQuery[p]);
    data.linkToMain = querystring.encode(originalQuery);
    res.render('news', data);
};


const _errorsHandler = func => async (req, res) => {
    try {
        await func(req, res);
    } catch (exc) {
        res.sendStatus(500);
    }
};


exports.index = _errorsHandler(index);
exports.newsCategory = _errorsHandler(newsCategory);
