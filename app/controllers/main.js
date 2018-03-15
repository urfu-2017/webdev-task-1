import querystring from 'querystring';

import config from '../../config';
import weather from '../models/weather';
import news from '../models/news';
import filterEmptyParams from '../libs/filter-empty-params';


const _prepareQueryForApi = (query, category) => {
    let result = null;
    if (!(query.query || query.lat && query.lon)) {
        result = { ...config.defaultQuery };
    } else {
        result = query.query
            ? { ...query }
            : { lattlong: `${query.lat},${query.lon}` };
    }
    Object.assign(
        result,
        filterEmptyParams({ country: query.country, category })
    );

    return result;
};


const _withTimeoutPromise = (innerPromise, timeout) =>
    new Promise(async (resolve, reject) => {
        setTimeout(() => reject(), timeout);
        const result = await innerPromise
            .catch(() => reject());
        resolve(result);
    });


const _index = async (req, res) => {
    const query = _prepareQueryForApi(req.query);
    const data = await _withTimeoutPromise(
        weather(query), config.apiRequestTimeout);
    data.categories = Object.entries(config.newsCategories)
        .map(([categoryEn, categoryRu]) => ({
            categoryEn,
            categoryRu,
            categoryLink: categoryEn + req.originalUrl
        }));
    res.render('index', data);
};


const _getLinkToMainPage = (query, params) => {
    const originalQuery = { ...query };
    Object.keys(params)
        .map(p => delete originalQuery[p]);

    return querystring.encode(originalQuery);
};


const _newsCategory = async (req, res) => {
    const query = _prepareQueryForApi(req.query, req.params.category);
    const weatherPromise = weather(query);
    const newsPromise = news(query);

    await _withTimeoutPromise(
        Promise.all([weatherPromise, newsPromise]),
        config.apiRequestTimeout
    );

    const data = await weatherPromise;
    data.articles = await newsPromise;

    data.linkToMain = _getLinkToMainPage(req.query, req.params);
    res.render('news', data);
};


const _promiseRejectionHandler = func => async (req, res) => {
    try {
        await func(req, res);
    } catch (exc) {
        res.sendStatus(500);
    }
};


export const index = _promiseRejectionHandler(_index);
export const newsCategory = _promiseRejectionHandler(_newsCategory);
