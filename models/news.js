'use strict';

const { getResponse } = require('./sendResponse');
const { URL } = require('url');
const config = require('./default');
const urlencode = require('urlencode');

let countryForNews = config.countryForNews;
let categories = config.categories;

let dayOptions = { year: 'numeric', month: 'long', day: 'numeric' };

module.exports.getNews = async (req) => {
    let lang;
    let translatedFields;
    let urlNews = new URL(config.urlForNews);
    let category = req.params.category;
    if (!categories.includes(category)) {
        return getObjectForRenderNews([], []);
    }

    if (!req.query.country) {
        urlNews.searchParams.append('country', countryForNews);
    } else {
        urlNews.searchParams.append('country', req.query.country);
    }
    urlNews.searchParams.append('category', category);

    let articles = (await getResponse(urlNews.href)).articles;
    let examplePhrase = articles[0].title;
    lang = (await detectLang(examplePhrase)).lang;
    translatedFields = (await translateFields(lang)).text;

    return getObjectForRenderNews(articles, translatedFields);
};

function getObjectForRenderNews(data, translatedFields) {
    let objectForRender = [];
    for (let i = 0; i < data.length; i++) {
        let authorOfNews = data[i].author;
        let titleOfNews = data[i].title;
        let descriptionOfNews = data[i].description;
        let publishedAt = new Date(data[i].publishedAt).toLocaleDateString('en-US', dayOptions);
        objectForRender.push({ author: authorOfNews, title: titleOfNews,
            description: descriptionOfNews, date: publishedAt,
            authorTranslate: translatedFields[0],
            publishedTranslate: translatedFields[3],
            descriptionTranslate: translatedFields[2],
            titleTranslate: translatedFields[1]
        });
    }

    return objectForRender;
}

function translateFields(lang) {
    let urlForTranslate = config.urlForTranslate;
    urlForTranslate = urlForTranslate + '&text=' + urlencode('Автор новости');
    urlForTranslate = urlForTranslate + '&text=' + urlencode('Название новости');
    urlForTranslate = urlForTranslate + '&text=' + urlencode('Описание новости');
    urlForTranslate = urlForTranslate + '&text=' + urlencode('Дата публикации');
    urlForTranslate = urlForTranslate + '&lang=ru-' + lang;

    return getResponse(urlForTranslate);
}

function detectLang(phrase) {
    let urlForDetect = config.urlForDetect;
    urlForDetect = urlForDetect + '&text=' + urlencode(phrase);

    return getResponse(urlForDetect);
}
