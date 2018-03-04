'use strict';

const { promiseError } = require('../utils');

module.exports = (data, api) => class {
    constructor(country, url) {
        this.url = url;
        this.country = country;
    }

    find() {
        if (!data.categories.map(i => i.url).includes(this.url) || !this.url) {
            return promiseError(data.ERRORS.NO_SUCH_CATEGORY);
        }
        if (!this.country) {
            return promiseError(data.ERRORS.NO_COUNTRY);
        }
        if (data.categories.map(i => i.url).includes(this.url)) {

            return api.getNewsByCategory(this.country,
                data.categories.find(i => i.url === this.url).category);
        }

        return promiseError(data.ERRORS.NO_SUCH_CATEGORY);
    }
};
