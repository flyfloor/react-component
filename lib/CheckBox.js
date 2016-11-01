'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _className = require('./util/className');

var _className2 = _interopRequireDefault(_className);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CheckBox = _react2.default.createClass({
    displayName: 'CheckBox',

    propTypes: {
        onChange: _react2.default.PropTypes.func,
        disabled: _react2.default.PropTypes.bool,
        checked: _react2.default.PropTypes.bool,
        className: _react2.default.PropTypes.string
    },
    getInitialState: function getInitialState() {
        return {
            checked: this.props.checked
        };
    },
    getDefaultProps: function getDefaultProps() {
        return {
            className: '',
            checked: false
        };
    },
    checkedChange: function checkedChange(e) {
        var _props = this.props,
            onChange = _props.onChange,
            value = _props.value;

        this.setState({
            checked: e.target.checked
        });
        if (onChange) onChange(e, value);
    },
    render: function render() {
        var _props2 = this.props,
            disabled = _props2.disabled,
            style = _props2.style,
            className = _props2.className,
            children = _props2.children;

        if (disabled) {
            className = (0, _className2.default)('disabled', className);
        }
        className = (0, _className2.default)(className, 'checkbox');
        var checked = this.state.checked;

        return _react2.default.createElement(
            'label',
            { style: style, className: className },
            _react2.default.createElement('input', { type: 'checkbox', disabled: disabled,
                checked: checked, onChange: this.checkedChange }),
            _react2.default.createElement(
                'span',
                null,
                children
            )
        );
    }
});

exports.default = CheckBox;