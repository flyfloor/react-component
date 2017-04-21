'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var Component = React.Component;
var PropTypes = require('prop-types');
var ReactDOM = require('react-dom');

var SelectorList = function (_Component) {
    _inherits(SelectorList, _Component);

    function SelectorList(props) {
        _classCallCheck(this, SelectorList);

        return _possibleConstructorReturn(this, (SelectorList.__proto__ || Object.getPrototypeOf(SelectorList)).call(this, props));
    }

    _createClass(SelectorList, [{
        key: 'handleInitScroll',
        value: function handleInitScroll() {
            this.initScrollTo('hour');
            this.initScrollTo('minute');
            this.initScrollTo('second');
        }
    }, {
        key: 'initScrollTo',
        value: function initScrollTo(type) {
            var val = this.props[type];
            var dom = ReactDOM.findDOMNode(this.refs[type + 'List']);
            if (dom) {
                var selected = dom.children[0].children[parseInt(val)];
                var to = selected.offsetTop;
                dom.scrollTop = to;
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.handleInitScroll();
        }
    }, {
        key: 'handleTimeChange',
        value: function handleTimeChange() {
            var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'hour';
            var val = arguments[1];

            this.props.onChange(type, val);
        }
    }, {
        key: 'formatSelectList',
        value: function formatSelectList() {
            var _this2 = this;

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
                            return _this2.handleTimeChange(type, i);
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
        }
    }, {
        key: 'render',
        value: function render() {
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
    }]);

    return SelectorList;
}(Component);

SelectorList.defaultProps = {
    hour: 0,
    minute: 0,
    second: 0,
    simple: false
};

SelectorList.propTypes = {
    onChange: PropTypes.func.isRequired
};

module.exports = SelectorList;