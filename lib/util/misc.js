'use strict';

var capitalize = function capitalize() {
    var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    return str.charAt(0).toUpperCase() + str.slice(1);
};

module.exports = {
    capitalize: capitalize
};