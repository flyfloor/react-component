'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');

var Item = React.createClass({
    displayName: 'Item',

    propTypes: {
        onItemClick: React.PropTypes.func
    },

    handleClick: function handleClick(e) {
        if (this.props.onItemClick) this.props.onItemClick(this.props.itemIndex);
    },
    render: function render() {
        var isActive = this.props.selected ? '_active' : '';
        return React.createElement(
            'div',
            _extends({ className: '_item ' + isActive, onClick: this.handleClick }, this.props),
            this.props.children
        );
    }
});

module.exports = Item;