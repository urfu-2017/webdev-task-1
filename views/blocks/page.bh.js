'use strict';

const config = require('../../config');

module.exports = bh =>
    bh.match('page', (ctx, json) => {
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
                                content: json.title
                                    ? `${json.title} | ${config.views.title}` : config.views.title
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
