'use strict'

const { News } = require('../models/news')
const { NewsItem, NewsCategory } = require('../models/datatypes')
const { config, checkType } = require('../common')
const assert = require('assert')


describe('news', () => {
    const sut = News.fromNewsApiKey(config.testApiKey)

    it('has some categories', () => {
        const categories = sut.getCategories()

        categories.forEach(checkType(NewsCategory, 'NewsCategory'));
        assert.ok(sut.getCategories().length > 0)
    })

    it('has news for each category', async () => {
        const categories = sut.getCategories()
        
        const results = await Promise.all(categories.map(x => sut.getNews(x)))
        assert.ok(results.every(x => x.length > 0))
        results.forEach(x => x.forEach(checkType(NewsItem, 'NewsItem')))
    })
})
