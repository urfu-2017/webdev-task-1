/* eslint max-params: ["error", 6]*/
'use strict';

const configValues = require('../config.json');

class News {
    constructor(title, description, date, urlToImage, author, translatedFields) {
        this.title = title;
        this.description = description;
        this.date = new Date(date).toLocaleDateString(configValues.DAY_OPTIONS);
        this.urlToImage = urlToImage;
        this.author = author;
        this.translatedAuthor = translatedFields[0];
        this.titleTranslate = translatedFields[1];
        this.descriptionTranslate = translatedFields[2];
        this.publishedTranslate = translatedFields[3];
    }

}

module.exports = News;
