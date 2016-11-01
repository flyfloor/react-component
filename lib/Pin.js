'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _ScrollMixin = require('./mixin/ScrollMixin');

var _ScrollMixin2 = _interopRequireDefault(_ScrollMixin);

var _className = require('./util/className');

var _className2 = _interopRequireDefault(_className);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Pin = _react2.default.createClass({
    displayName: 'Pin',

    mixins: [_ScrollMixin2.default],

    propTypes: {
        top: _react2.default.PropTypes.number,
        begin: _react2.default.PropTypes.number
    },

    getInitialState: function getInitialState() {
        return {
            fixed: false,
            baseTop: 0
        };
    },
    getDefaultProps: function getDefaultProps() {
        return {
            top: 0,
            className: ''
        };
    },
    componentDidMount: function componentDidMount() {
        this.setState({
            baseTop: this.node2Top()
        });
    },
    node2Top: function node2Top() {
        var begin = this.props.begin;

        if (begin) return begin;
        var pinNode = _reactDom2.default.findDOMNode(this.refs.pinNode);
        return pinNode.offsetTop;
    },
    onScroll: function onScroll() {
        var _windowScrollOffset = this.windowScrollOffset(),
            _top = _windowScrollOffset._top;

        this.setState({
            fixed: _top >= this.state.baseTop
        });
    },
    render: function render() {
        var fixed = this.state.fixed;
        var _props = this.props,
            top = _props.top,
            children = _props.children,
            className = _props.className;

        className = (0, _className2.default)(className, 'pin');
        var stat = fixed ? 'fixed' : '';
        return _react2.default.createElement(
            'div',
            { className: className + ' ' + stat, style: { 'top': top }, ref: 'pinNode' },
            children
        );
    }
});

exports.default = Pin;