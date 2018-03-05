'use strict';

module.exports = {
    promiseError: error => new Promise(resolve => resolve({ error })),
    findCategoryName: (categories, category) => {
        const res = categories.find(i => i.category === category);

        return res ? res.name : null;
    },
    reject: error => Promise.reject({ error: error.error ? error.error : error })
};
