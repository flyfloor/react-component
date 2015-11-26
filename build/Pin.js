const React = require('react');
const ReactDOM = require('react-dom');
const css = require('../css/pin.less');
const ScrollMixin = require('../mixin/ScrollMixin');

const Pin = React.createClass({
    displayName: 'Pin',

    mixins: [ScrollMixin],

    getInitialState() {
        return {
            fixed: false,
            baseTop: 0
        };
    },

    componentDidMount() {
        this.setState({
            baseTop: this.node2Top()
        });
    },

    node2Top() {
        let pinNode = ReactDOM.findDOMNode(this.refs.pinNode);
        return pinNode.offsetTop;
    },

    getDefaultProps() {
        return {
            top: 0
        };
    },

    onScroll(e) {
        let { _top } = this.windowScrollOffset();
        this.setState({
            fixed: _top >= this.state.baseTop
        });
    },

    render() {
        let stat = this.state.fixed ? 'fixed' : '';
        return React.createElement(
            'div',
            { className: 'ui pin ' + stat, style: { 'top': this.props.top }, ref: 'pinNode' },
            this.props.children
        );
    }
});

module.exports = Pin;