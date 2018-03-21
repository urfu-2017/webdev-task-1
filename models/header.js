'use strict';
const back = { url: '/', backTitle: 'На главную' };
const title = 'Новости и погода';

class Header {
    constructor() {
        this.title = title;
        this.back = back;
    }

    static getHeader(param) {
        if (!param) {
            return { title };
        }

        return { title, back };
    }
}

module.exports = Header;
