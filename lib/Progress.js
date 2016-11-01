'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _className = require('./util/className');

var _className2 = _interopRequireDefault(_className);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Progress = _react2.default.createClass({
    displayName: 'Progress',

    propTypes: {
        value: _react2.default.PropTypes.number,
        disabled: _react2.default.PropTypes.bool,
        status: _react2.default.PropTypes.oneOf(['active', 'failed'])
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
            disabled = _props.disabled,
            children = _props.children;

        if (value < 0) value = 0;
        if (value > 100) value = 100;
        className = (0, _className2.default)(className, 'progress');

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

        return _react2.default.createElement(
            'div',
            { className: className },
            _react2.default.createElement(
                'div',
                { className: '_progress', style: { 'width': value + '%' } },
                children
            )
        );
    }
});

exports.default = Progress;