'use strict';

class News {
    constructor({ title, text, source, date, category }) {
        this.title= title;
        this.text = text;
        this.source = source;
        this.date = date;
        this.category = category;
    };
}

module.exports = News;
