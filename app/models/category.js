const { categories } = require('../../config');

class Category {
  constructor(name, category) {
    this.name = name;
    this.category = category;
  }

  static get() {
    return Object.keys(categories).map(name => new Category(categories[name], name));
  }
}

module.exports = Category;
