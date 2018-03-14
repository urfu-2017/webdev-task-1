'use strict';

const { format } = require('url');
const path = require('path');

const dotenv = require('dotenv');
const request = require('request-promise-native');

const defaultValues = dotenv.config({ path: path.join(__dirname, '../.env') }).parsed;
const categories = defaultValues.CATEGORIES;
const dayOptions = { year: 'numeric', month: 'long', day: 'numeric' };

class News {
    static async getNews(req) {
        if (!categories.includes((req.params.category))) {
            return getObjectForRenderNews([], []);
        }
        let urlNews = setUrl(defaultValues.HOST_FOR_NEWS,
            defaultValues.PATHNAME_FOR_NEWS,
            { apiKey: defaultValues.APIKEY_FOR_NEWS,
                category: req.params.category,
                country: req.query.country || defaultValues.COUNTRY_FOR_NEWS });
        let articles = (await getResponse(urlNews)).articles;
        let lang = (await detectLang(articles[0].title)).lang;
        let translatedFields = (((await translateFields(lang)).text)[0]).split('-');

        return getObjectForRenderNews(articles, translatedFields);
    }
}

function setUrl(host, pathname, params) {
    const url = format({
        protocol: defaultValues.PROTOCOL,
        host,
        pathname,
        query: params
    });

    return url;
}

function translateFields(lang) {
    return getResponse(setUrl(defaultValues.HOST_FOR_TRANSLATE,
        defaultValues.PATHNAME_FOR_TRANSLATE,
        { key: defaultValues.APIKEY_FOR_TRANSLATE,
            text: 'Автор-Название-Описание-Дата',
            lang: `ru-${lang}` }));
}

function detectLang(phrase) {
    return getResponse(setUrl(defaultValues.HOST_FOR_TRANSLATE,
        defaultValues.PATHNAME_FOR_DETECT,
        { key: defaultValues.APIKEY_FOR_TRANSLATE,
            text: phrase }));
}

function getObjectForRenderNews(data, translatedFields) {
    let objectForRender = [];
    for (let i = 0; i < data.length; i++) {
        let authorOfNews = data[i].author;
        let urlToImage = data[i].urlToImage;
        let titleOfNews = data[i].title;
        let descriptionOfNews = data[i].description;
        let publishedAt = new Date(data[i].publishedAt).toLocaleDateString(dayOptions);
        objectForRender.push({ author: authorOfNews,
            title: titleOfNews,
            description: descriptionOfNews,
            date: publishedAt,
            urlToImage,
            authorTranslate: translatedFields[0],
            publishedTranslate: translatedFields[3],
            descriptionTranslate: translatedFields[2],
            titleTranslate: translatedFields[1]
        });
    }

    return objectForRender;
}

function getResponse(url) {
    return request(url)
        .then(response => JSON.parse(response))
        .catch(err => err);
}

module.exports = News;
