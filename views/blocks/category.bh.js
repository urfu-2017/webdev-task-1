'use strict';

const config = require('../../config');

module.exports = bh => bh.match('category', (ctx, json) => {
    ctx.tag('a');
    ctx.attrs({ href: `/${json.name}` });

    ctx.content([
        {
            elem: 'icon',
            tag: 'img',
            attrs: { src: `${config.staticBasePath}category/${json.name}.png`, alt: json.text }
        },
        {
            elem: 'name',
            tag: 'h3',
            content: json.text
        }
    ]);
});
