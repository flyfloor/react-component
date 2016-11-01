'use strict';

var React = require('react');

var Item = React.createClass({
    displayName: 'Item',

    propTypes: {
        children: React.PropTypes.node
    },
    getDefaultProps: function getDefaultProps() {
        return {
            className: ''
        };
    },
    render: function render() {
        var children = this.props.children;

        return React.createElement(
            'div',
            this.props,
            children
        );
    }
});

module.exports = Item;