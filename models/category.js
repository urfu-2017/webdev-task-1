'use strict';

class Category {
    constructor(link, name, icoSrc, icoAlt) {
        this.name = name;
        this.link = link;
        this.icoSrc = icoSrc;
        this.icoAlt = icoAlt;
    }
}

module.exports = Category;
