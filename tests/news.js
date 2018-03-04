'use strict'

const { News } = require('../models/news')
const { NewsItem, NewsCategory } = require('../models/datatypes')
const assert = require('assert')


describe('news', () => {
    const testApiKey = 'af406ce76d00443f90f40b9a2e5f2da4'
    const sut = News.fromNewsApiKey(testApiKey)

    it('has some categories', () => {
        const categories = sut.getCategories()

        categories.forEach(NewsCategory.case({
            NewsCategory: () => {},
            _: () => assert.fail('This isnt a NewsCategory')
        }));
        assert.ok(sut.getCategories().length > 0)
    })

    it('has news for each category', async () => {
        const categories = sut.getCategories()
        
        const results = await Promise.all(categories.map(x => sut.getNews(x)))
        assert.ok(results.every(x => x.length > 0))
        results.forEach(x => x.forEach(NewsItem.case({
            NewsItem: () => {},
            _: () => assert.fail('This isnt a NewsItem')
        })))
    })
})
