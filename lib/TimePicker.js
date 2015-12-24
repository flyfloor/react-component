'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Time = require('./util/Time');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TimePicker = _react2.default.createClass({
    displayName: 'TimePicker',
    getInitialState: function getInitialState() {
        return {
            value: this.props.value
        };
    },
    getDefaultProps: function getDefaultProps() {
        return {
            value: '00:00:00'
        };
    },
    handleInputChange: function handleInputChange(e) {
        this.setState({
            value: e.target.value
        });
    },
    handleBlur: function handleBlur(e) {
        var value = (0, _Time.validateTime)(e.target.value);
        this.setState({
            value: value
        });
    },
    render: function render() {
        return _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement('input', { type: 'text', defaultValue: this.state.value, value: this.state.value, onBlur: this.handleBlur, onChange: this.handleInputChange })
        );
    }
});

exports.default = TimePicker;