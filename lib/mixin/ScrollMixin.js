'use strict';

var ScrollMixin = {
    componentDidMount: function componentDidMount() {
        document.addEventListener('scroll', this.onScroll);
    },
    componentWillUnmount: function componentWillUnmount() {
        document.removeEventListener('scroll', this.onScroll);
    },
    windowScrollOffset: function windowScrollOffset() {
        var doc = document.documentElement;
        var left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
        var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
        return {
            _left: left,
            _top: top
        };
    }
};

module.exports = ScrollMixin;