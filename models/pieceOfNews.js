'use strict';

const moment = require('moment');
moment.locale('ru');

class PieceOfNews {
    constructor({ title, publishedAt, urlToImage, description, source, url }) {
        this.title = title;
        this.urlToImage = urlToImage;
        this.publishedAt = moment(publishedAt).format('D MMMM Y');
        this.description = description;
        this.source = source;
        this.url = url;
    }
}

exports.PieceOfNews = PieceOfNews;
