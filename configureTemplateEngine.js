'use strict';

const path = require('path');
const fs = require('fs');
const bh = require('bh');
const renderEngine = new bh.BH();

module.exports = (app) => {
    const blockPath = path.resolve(__dirname, 'views', 'blocks');
    fs.readdirSync(blockPath).forEach(blockFile => {
        require(path.resolve(blockPath, blockFile))(renderEngine);
    });

    app.engine('js', (filepath, options, callback) => {
        const renderFunction = require(filepath);

        if (renderFunction) {
            const bemjson = renderFunction(options);
            const rendered = renderEngine.apply(bemjson);

            return callback(null, rendered);
        }

        callback(new Error('View file not found'));
    });

    app.set('views', './views');
    app.set('view engine', 'js');
};
