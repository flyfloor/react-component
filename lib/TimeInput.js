'use strict';

var React = require('react');
var timeStr2Obj = require('./util/time').timeStr2Obj;
var klassName = require('./util/className');
var PropTypes = React.PropTypes;

var TimeInput = React.createClass({
    displayName: 'TimeInput',

    propTypes: {
        simple: PropTypes.bool,
        value: PropTypes.string,
        onChange: PropTypes.func.isRequired,
        className: PropTypes.string,
        placeHolder: PropTypes.string
    },

    getDefaultProps: function getDefaultProps() {
        return {
            simple: false,
            value: '',
            className: '',
            placeHolder: 'input time'
        };
    },
    getInitialState: function getInitialState() {
        var _initTime = this.initTime(),
            _initTime$value = _initTime.value,
            value = _initTime$value === undefined ? "" : _initTime$value;

        if (value !== this.props.value) {
            this.props.onChange(value);
        }
        return { value: value };
    },
    initTime: function initTime() {
        var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props.value;
        var simple = this.props.simple;

        var _timeStr2Obj = timeStr2Obj(val, { simple: simple }),
            hour = _timeStr2Obj.hour,
            min = _timeStr2Obj.min,
            sec = _timeStr2Obj.sec;

        var value = this.formatValue(hour, min, sec);
        if (!val) {
            return {};
        }
        return { value: value };
    },
    formatValue: function formatValue(hour, min, sec) {
        return this.props.simple ? hour + ':' + min : hour + ':' + min + ':' + sec;
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.props.value) {
            this.setState(this.initTime(nextProps.value));
        }
    },
    handleInputChange: function handleInputChange(e) {
        var value = e.target.value;

        this.setState({ value: value });
    },
    handleOnBlur: function handleOnBlur() {
        var _this = this;

        var _initTime2 = this.initTime(this.state.value),
            value = _initTime2.value;

        if (value !== this.state.value) {
            this.setState({ value: value }, function () {
                return _this.props.onChange(value);
            });
        }
    },
    render: function render() {
        var value = this.state.value;
        var _props = this.props,
            className = _props.className,
            placeHolder = _props.placeHolder;

        className = klassName(className, 'timeinput');
        return React.createElement(
            'div',
            { className: className },
            React.createElement('input', { type: 'text', className: '_input', placeholder: placeHolder, onBlur: this.handleOnBlur, value: value,
                onChange: this.handleInputChange })
        );
    }
});

module.exports = TimeInput;