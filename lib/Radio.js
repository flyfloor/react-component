'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _className = require('./util/className');

var _className2 = _interopRequireDefault(_className);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Radio = _react2.default.createClass({
    displayName: 'Radio',

    propTypes: {
        onChange: _react2.default.PropTypes.func,
        checked: _react2.default.PropTypes.bool,
        disabled: _react2.default.PropTypes.bool,
        value: _react2.default.PropTypes.string,
        className: _react2.default.PropTypes.string
    },

    getDefaultProps: function getDefaultProps() {
        return {
            className: ''
        };
    },
    checkedChange: function checkedChange(e) {
        var _props = this.props,
            value = _props.value,
            onChange = _props.onChange;

        if (onChange) onChange(e, value);
    },
    render: function render() {
        var _props2 = this.props,
            className = _props2.className,
            checked = _props2.checked,
            disabled = _props2.disabled,
            style = _props2.style,
            children = _props2.children;

        className = (0, _className2.default)(className, 'radio');
        if (disabled) {
            className = className + ' _disabled';
        }
        return _react2.default.createElement(
            'label',
            { style: style, className: className },
            _react2.default.createElement('input', { type: 'radio', ref: 'radioInput', disabled: disabled, checked: checked, onChange: this.checkedChange }),
            _react2.default.createElement(
                'span',
                null,
                children
            )
        );
    }
});

exports.default = Radio;