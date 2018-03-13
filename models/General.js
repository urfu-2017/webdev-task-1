'use strict';

class General {
    constructor(gereralInfo) {
        let header = {
            name: gereralInfo.name
        };
        let footer = {
            dev: gereralInfo.developer,
            year: gereralInfo.year
        };
        this.header = header;
        this.footer = footer;
    }
}

module.exports = General;
