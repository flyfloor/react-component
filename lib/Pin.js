'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var ScrollMixin = require('./mixin/ScrollMixin');

var Pin = React.createClass({
    displayName: 'Pin',

    mixins: [ScrollMixin],

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
        var pinNode = ReactDOM.findDOMNode(this.refs.pinNode);
        return pinNode.offsetTop;
    },
    getDefaultProps: function getDefaultProps() {
        return {
            top: 0
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
        var stat = this.state.fixed ? 'fixed' : '';
        return React.createElement(
            'div',
            { className: 'ui pin ' + stat, style: { 'top': this.props.top }, ref: 'pinNode' },
            this.props.children
        );
    }
});

module.exports = Pin;