'use strict';

// Модели замыкают на себя работу с данными
// и обычно представляют собой «класс»

class Cathegory {
    constructor({ name, url }) {
        this.name = name;
        this.url = url;
    }
}

module.exports = Cathegory;
