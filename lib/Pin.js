'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var ScrollMixin = require('./mixin/ScrollMixin');
var klassName = require('./util/className');

var Pin = React.createClass({
    displayName: 'Pin',

    mixins: [ScrollMixin],

    propTypes: {
        top: React.PropTypes.number,
        begin: React.PropTypes.number
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
        var pinNode = ReactDOM.findDOMNode(this.refs.pinNode);
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

        className = klassName(className, 'pin');
        var stat = fixed ? 'fixed' : '';
        return React.createElement(
            'div',
            { className: className + ' ' + stat, style: { 'top': top }, ref: 'pinNode' },
            children
        );
    }
});

module.exports = Pin;