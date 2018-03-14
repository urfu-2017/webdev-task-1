module.exports = {
  debug: true,
  port: process.env.PORT || 8080,
  staticBasePath: '/',
  weatherDefaultCity: 'Moscow',
  weatherBasePath: 'https://www.metaweather.com/',
  get weatherApiLocation() {
    return `${this.weatherBasePath}api/location/`;
  },
  get weatherApiSearch() {
    return `${this.weatherBasePath}/api/location/search`;
  },
  newsApiKey: '8f7d1baa6a2745228cedc52c73ddd738',
  newsApiBasePath: 'https://newsapi.org/v2/top-headlines',
  categories: {
    business: 'Бизнес',
    entertainment: 'Развлечения',
    health: 'Здоровье',
    general: 'Общее',
    science: 'Наука',
    sports: 'Спорт',
    technology: 'Технологии',
  },
};
