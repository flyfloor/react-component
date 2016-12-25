'use strict';

var React = require('react');
var PropTypes = React.PropTypes;
var ReactDOM = require('react-dom');

var SelectorList = React.createClass({
    displayName: 'SelectorList',
    getDefaultProps: function getDefaultProps() {
        return {
            hour: 0,
            minute: 0,
            second: 0,
            simple: false
        };
    },


    propTypes: {
        onChange: PropTypes.func.isRequired
    },

    handleInitScroll: function handleInitScroll() {
        this.initScrollTo('hour');
        this.initScrollTo('minute');
        this.initScrollTo('second');
    },
    initScrollTo: function initScrollTo(type) {
        var val = this.props[type];
        var dom = ReactDOM.findDOMNode(this.refs[type + 'List']);
        if (dom) {
            var selected = dom.children[0].children[parseInt(val)];
            var to = selected.offsetTop;
            dom.scrollTop = to;
        }
    },
    componentDidMount: function componentDidMount() {
        this.handleInitScroll();
    },
    handleTimeChange: function handleTimeChange() {
        var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'hour';
        var val = arguments[1];

        this.props.onChange(type, val);
    },
    formatSelectList: function formatSelectList() {
        var _this = this;

        var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'hour';

        var val = this.props[type];
        var max = type === 'hour' ? 24 : 60;
        var nodes = [];

        var _loop = function _loop(i) {
            var _i = i < 10 ? '0' + i : String(i);
            nodes.push(React.createElement(
                'li',
                { key: type + '-' + i, className: val == _i ? '_item _active' : '_item',
                    onClick: function onClick() {
                        return _this.handleTimeChange(type, i);
                    } },
                React.createElement(
                    'span',
                    null,
                    _i
                )
            ));
        };

        for (var i = 0; i < max; i++) {
            _loop(i);
        }
        return React.createElement(
            'ul',
            null,
            nodes
        );
    },
    render: function render() {
        var simple = this.props.simple;

        return React.createElement(
            'div',
            { className: '_section' },
            React.createElement(
                'div',
                { className: '_list _hour', ref: 'hourList' },
                this.formatSelectList('hour')
            ),
            React.createElement(
                'div',
                { className: '_list _minute', ref: 'minuteList' },
                this.formatSelectList('minute')
            ),
            simple ? null : React.createElement(
                'div',
                { className: '_list _second', ref: 'secondList' },
                this.formatSelectList('second')
            )
        );
    }
});

module.exports = SelectorList;