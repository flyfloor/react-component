'use strict';

var React = require('react');
var klassName = require('./util/className');

var Progress = React.createClass({
    displayName: 'Progress',

    propTypes: {
        value: React.PropTypes.number,
        disabled: React.PropTypes.bool,
        status: React.PropTypes.oneOf(['active', 'failed'])
    },

    getDefaultProps: function getDefaultProps() {
        return {
            value: 0,
            className: ''
        };
    },
    render: function render() {
        var _props = this.props;
        var value = _props.value;
        var className = _props.className;
        var status = _props.status;
        var disabled = _props.disabled;
        var children = _props.children;

        if (value < 0) value = 0;
        if (value > 100) value = 100;
        className = klassName(className, 'progress');

        if (status) {
            className += ' _' + status;
        }
        if (disabled) {
            className += ' _disabled';
        }
        if (value === 100) {
            className += ' _completed';
        }
        if (children) {
            className += ' _context';
        }

        return React.createElement(
            'div',
            { className: className },
            React.createElement(
                'div',
                { className: '_progress', style: { 'width': value + '%' } },
                children
            )
        );
    }
});

module.exports = Progress;