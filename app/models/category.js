const categories = [
  'business',
  'entertainment',
  'general',
  'health',
  'science',
  'sports',
  'technology',
];

const russianCategories = {
  business: 'Бизнес',
  entertainment: 'Развлечения',
  health: 'Здоровье',
  general: 'Общее',
  science: 'Наука',
  sports: 'Спорт',
  technology: 'Технологии',
};

class Category {
  constructor(name, urlName) {
    this.name = name;
    this.urlName = urlName;
  }

  static get() {
    return categories.map(name => new Category(russianCategories[name], name));
  }
}

module.exports = Category;
