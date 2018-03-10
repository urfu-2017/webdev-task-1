'use strict';
const back = { url: '/', backTitle: 'На главную' };
const title = 'Новости и погода';

class Header {
    static head(param) {
        if (!param) {
            return { title };
        }

        return { title, back };
    }
}

module.exports = Header;
