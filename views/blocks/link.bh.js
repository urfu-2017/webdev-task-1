'use strict';

module.exports = bh => bh.match('link', (ctx, json) => {
    ctx.tag('a');
    ctx.attrs({ href: json.to });
    ctx.content(json.content);
});
