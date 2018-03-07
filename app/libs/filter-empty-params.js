'use strict';


module.exports = obj => {
    const result = {};
    for (let [prop, value] of Object.entries(obj)) {
        if (value) {
            result[prop] = value;
        }
    }

    return result;
};
