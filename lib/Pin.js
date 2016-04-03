'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var ScrollMixin = require('./mixin/ScrollMixin');

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
    getDefaultProps: function getDefaultProps() {
        return {
            top: 0,
            className: ''
        };
    },
    onScroll: function onScroll(e) {
        var _windowScrollOffset = this.windowScrollOffset();

        var _top = _windowScrollOffset._top;

        this.setState({
            fixed: _top >= this.state.baseTop
        });
    },
    render: function render() {
        var fixed = this.state.fixed;
        var _props = this.props;
        var top = _props.top;
        var children = _props.children;
        var className = _props.className;

        var stat = fixed ? 'fixed' : '';
        return React.createElement(
            'div',
            { className: 'ui pin ' + stat + ' ' + className, style: { 'top': top }, ref: 'pinNode' },
            children
        );
    }
});

module.exports = Pin;