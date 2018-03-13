'use strict';

const config = require('../../config');

module.exports = bh => bh.match('page', (ctx, json) => {
    const siteName = config.views.title;
    const pageTitle = json.title ? `${json.title} | ${siteName}` : siteName;

    ctx
        .bem(false)
        .tag('html')
        .attrs({ lang: config.views.lang })
        .content(
            [
                {
                    tag: 'head',
                    content: [
                        {
                            tag: 'meta',
                            attrs: { charset: config.views.charset }
                        },
                        {
                            tag: 'title',
                            content: pageTitle
                        },
                        {
                            tag: 'link',
                            attrs: {
                                rel: 'stylesheet',
                                href: config.staticBasePath + 'common.css'
                            }
                        }
                    ]
                },
                {
                    tag: 'body',
                    attrs: { class: 'page' },
                    content: {
                        elem: 'container',
                        content: json.content
                    }
                }
            ],
            true
        );
});
