import categoriesData from '../models/mocks/newsCategories';

export const categories = categoriesData;

export const findCategory = (key) => (categories.find(x => x.key === key));
