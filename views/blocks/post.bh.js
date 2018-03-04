'use strict';

module.exports = bh => bh.match('post', (ctx, { post }) => {
    ctx.tag('article');
    const header = getHeader(post.title, post.publishedDate);
    const content = getContent(post.description, post.image);
    const footer = getFooter(post.source);

    ctx.content([header, content, footer]);
});

function getHeader(title, date) {
    const day = ('0' + date.getUTCDate()).slice(-2);
    const month = ('0' + (date.getUTCMonth() + 1)).slice(-2);
    const year = date.getUTCFullYear();

    return {
        elem: 'header',
        tag: 'header',
        content: [
            {
                elem: 'title',
                tag: 'h3',
                content: title
            },
            {
                elem: 'date',
                tag: 'time',
                attrs: { datetime: date.toDateString() },
                content: `${day}.${month}.${year}`
            }
        ]
    };
}

function getContent(description, image) {
    const content = { elem: 'content', content: [] };

    if (image) {
        content.content.push({
            elem: 'thumb',
            tag: 'image',
            attrs: { src: image }
        });
    }

    content.content.push({
        elem: 'description',
        tag: 'p',
        content: description
    });

    return content;
}

function getFooter(source) {
    return {
        elem: 'footer',
        tag: 'footer',
        content: `&copy;${source}`
    };
}
