'use strict';

var React = require('react');
var PropTypes = React.PropTypes;
var klassName = require('./util/className');

var Panel = React.createClass({
    displayName: 'Panel',

    propTypes: {
        title: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
    },
    render: function render() {
        var _props = this.props,
            className = _props.className,
            title = _props.title;

        return React.createElement(
            'div',
            { className: klassName('panel', className) },
            title ? React.createElement(
                'div',
                { className: '_title' },
                title
            ) : null,
            React.createElement(
                'div',
                { className: '_content' },
                this.props.children
            )
        );
    }
});

module.exports = Panel;