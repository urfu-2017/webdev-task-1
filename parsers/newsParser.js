'use strict';

const dotenv = require('dotenv');
const NewsAPI = require('newsapi');

const configValues = require('../config.json');
const defaultParser = require('./defaultParser');
const defaultValues = dotenv.config('../.env').parsed;
const News = require('../models/news');

const newsapi = new NewsAPI(defaultValues.APIKEY_FOR_NEWS);

async function getNews(req) {
    if (!configValues.CATEGORIES.includes((req.params.category))) {
        return getObjectForRenderNews([], []);
    }

    let articles = await newsapi.v2.topHeadlines(
        {
            category: req.params.category,
            country: req.query.country || configValues.COUNTRY_FOR_NEWS
        }
    ).then(response => response.articles);

    let lang = (await detectLang(articles[0].title)).lang;
    let translatedFields = (((await translateFields(lang)).text)[0]).split('-');

    return getObjectForRenderNews(articles, translatedFields);
}

function getObjectForRenderNews(data, translatedFields) {
    let newsField = [];
    for (let i = 0; i < data.length; i++) {
        newsField.push(
            new News(
                data[i].title,
                data[i].description,
                data[i].publishedAt,
                data[i].urlToImage,
                data[i].author || data[i].source.name,
                translatedFields
            )
        );
    }

    return { newsField };
}

function translateFields(lang) {
    return defaultParser.getResponse(
        defaultParser.setUrl(
            defaultValues.HOST_FOR_TRANSLATE,
            defaultValues.PATHNAME_FOR_TRANSLATE,
            {
                key: defaultValues.APIKEY_FOR_TRANSLATE,
                text: configValues.TEXT_FOR_TRANSLATE,
                lang: `${configValues.DEFAULT_LANG}-${lang}`
            }
        )
    );
}

function detectLang(phrase) {
    return defaultParser.getResponse(
        defaultParser.setUrl(
            defaultValues.HOST_FOR_TRANSLATE,
            defaultValues.PATHNAME_FOR_DETECT,
            {
                key: defaultValues.APIKEY_FOR_TRANSLATE,
                text: phrase
            }
        )
    );
}

module.exports.getNews = getNews;
