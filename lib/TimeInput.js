'use strict';

var React = require('react');
var klassName = require('./util/className');
var TimeInputMixin = require('./mixin/TimeInputMixin');

var TimeInput = React.createClass({
    displayName: 'TimeInput',

    mixins: [TimeInputMixin],

    handleInputChange: function handleInputChange(e) {
        var value = e.target.value;

        this.setState({ inputVal: value });
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
        return { value: value, inputVal: value };
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.props.value) {
            var _initTime2 = this.initTime(nextProps.value),
                value = _initTime2.value;

            this.setState({
                value: value,
                inputVal: value
            });
        }
    },
    handleOnFocus: function handleOnFocus(e) {
        var onFocus = this.props.onFocus;

        if (onFocus) {
            onFocus(e);
        }
    },
    handleOnBlur: function handleOnBlur() {
        var _this = this;

        var _initTime3 = this.initTime(this.state.inputVal),
            value = _initTime3.value;

        var onBlur = this.props.onBlur;

        this.setState({
            inputVal: value
        });
        if (value !== this.state.value) {
            this.setState({ value: value }, function () {
                return _this.props.onChange(value);
            });
        }

        if (onBlur) {
            onBlur(value);
        }
    },
    render: function render() {
        var inputVal = this.state.inputVal;
        var _props = this.props,
            className = _props.className,
            placeHolder = _props.placeHolder;

        className = klassName(className, 'timeinput');
        return React.createElement(
            'div',
            { className: className },
            React.createElement('input', { type: 'text', className: '_input', placeholder: placeHolder,
                onFocus: this.handleOnFocus,
                onBlur: this.handleOnBlur, value: inputVal,
                onChange: this.handleInputChange })
        );
    }
});

module.exports = TimeInput;