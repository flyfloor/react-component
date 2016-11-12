'use strict';

var React = require('react');
var klassName = require('./util/className');
var PropTypes = React.PropTypes;

var Progress = React.createClass({
    displayName: 'Progress',

    propTypes: {
        value: PropTypes.number,
        disabled: PropTypes.bool,
        size: PropTypes.oneOf(['large', 'normal', 'small']),
        status: PropTypes.oneOf(['warning', 'failed', 'success'])
    },

    getDefaultProps: function getDefaultProps() {
        return {
            value: 0,
            className: ''
        };
    },
    render: function render() {
        var _props = this.props,
            value = _props.value,
            className = _props.className,
            status = _props.status,
            size = _props.size,
            disabled = _props.disabled,
            children = _props.children;

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

        if (size) {
            className += ' _' + size;
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