'use strict'

import { News } from '../models/news'
import { NewsItem, NewsCategory } from '../models/datatypes'
import { config, checkType } from '../common'
import assert from 'assert'


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
