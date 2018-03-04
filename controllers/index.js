'use strict';

module.exports = (models, data) => ({
    category: require('./category')(models, data),
    main: require('./main')(models, data)
});
