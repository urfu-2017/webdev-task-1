'use strict';

const { promiseError } = require('../utils');

module.exports = (data, api) => class {
    constructor(query) {
        this.query = query;
    }

    find() {
        if (this.query.query) {
            return api.getWeatherByQuery(this.query.query);
        }
        if (this.query.lat && this.query.lon) {
            return api.getWeatherByCoordinates(`${this.query.lat},${this.query.lon}`);
        }

        return promiseError(data.ERRORS.CANT_LOCATE);
    }
};
