"use strict";

var IntervalMixin = {
    componentWillMount: function componentWillMount() {
        this.intervals = [];
    },

    setInterval: function (_setInterval) {
        function setInterval() {
            return _setInterval.apply(this, arguments);
        }

        setInterval.toString = function () {
            return _setInterval.toString();
        };

        return setInterval;
    }(function () {
        this.intervals.push(setInterval.apply(null, arguments));
    }),

    clearInterval: function (_clearInterval) {
        function clearInterval() {
            return _clearInterval.apply(this, arguments);
        }

        clearInterval.toString = function () {
            return _clearInterval.toString();
        };

        return clearInterval;
    }(function () {
        this.intervals.map(clearInterval);
    }),

    componentWillUnmount: function componentWillUnmount() {
        this.clearInterval();
    }
};

module.exports = IntervalMixin;