'use strict';

const path = require('path');
const fs = require('fs');
const bh = require('bh');

module.exports = (app) => {
    const blockPath = path.resolve(__dirname, 'views', 'blocks');
    const blocks = fs.readdirSync(blockPath);

    app.engine('js', (filepath, options, callback) => {
        // Для автообновления шаблона, на каждый запрос создаём новый экземпляр BH
        // и очищаем кэш модулей node.js
        const render = new bh.BH();
        const renderFunction = require(filepath);

        blocks.forEach(blockFile => {
            require(path.resolve(blockPath, blockFile))(render);
        });

        Object.keys(require.cache).forEach(key => {
            delete require.cache[key];
        });

        if (renderFunction) {
            const bemjson = renderFunction(options);
            const rendered = render.apply(bemjson);

            return callback(null, rendered);
        }

        callback(new Error('View file not found'));
    });

    app.set('views', './views');
    app.set('view engine', 'js');
};
