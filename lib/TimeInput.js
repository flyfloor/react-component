'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var Component = React.Component;
var klassName = require('./util/className');
var timeInputCmp = require('./high-order/timeInputCmp');

var TimeInput = function (_Component) {
    _inherits(TimeInput, _Component);

    function TimeInput(props) {
        _classCallCheck(this, TimeInput);

        var _this = _possibleConstructorReturn(this, (TimeInput.__proto__ || Object.getPrototypeOf(TimeInput)).call(this, props));

        _this.handleInputChange = _this.handleInputChange.bind(_this);
        _this.handleClick = _this.handleClick.bind(_this);
        _this.handleOnBlur = _this.handleOnBlur.bind(_this);

        var _this$initTime = _this.initTime({ value: props.value }),
            value = _this$initTime.value,
            displayValue = _this$initTime.displayValue;

        _this.state = {
            value: value,
            displayValue: displayValue
        };
        return _this;
    }

    _createClass(TimeInput, [{
        key: 'handleInputChange',
        value: function handleInputChange(e) {
            this.setState({ displayValue: e.target.value });
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.value !== this.props.value) {
                var _initTime = this.initTime({ value: nextProps.value }),
                    value = _initTime.value,
                    displayValue = _initTime.displayValue;

                this.setState({
                    value: value,
                    displayValue: displayValue
                });
            }
        }
    }, {
        key: 'handleClick',
        value: function handleClick(e) {
            var onClick = this.props.onClick;

            if (onClick) {
                this.inputDOM.focus();
                onClick(e);
            }
        }
    }, {
        key: 'handleOnBlur',
        value: function handleOnBlur() {
            var _this2 = this;

            var _initTime2 = this.initTime({ displayValue: this.state.displayValue }),
                value = _initTime2.value,
                displayValue = _initTime2.displayValue;

            var onBlur = this.props.onBlur;

            this.setState({
                displayValue: displayValue
            });
            if (value !== this.state.value) {
                this.setState({ value: value }, function () {
                    return _this2.props.onChange(value);
                });
            }

            if (onBlur) {
                onBlur(value);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var displayValue = this.state.displayValue;
            var _props = this.props,
                className = _props.className,
                placeHolder = _props.placeHolder,
                simple = _props.simple,
                onFocus = _props.onFocus;

            simple = simple ? '_simple' : '';
            className = klassName(className, 'timeinput', simple);
            return React.createElement(
                'div',
                { className: className },
                React.createElement(
                    'div',
                    { className: '_input', onClick: this.handleClick },
                    React.createElement('input', { type: 'text', className: '_input', placeholder: placeHolder,
                        ref: function ref(input) {
                            _this3.inputDOM = input;
                        },
                        onFocus: onFocus,
                        onBlur: this.handleOnBlur, value: displayValue,
                        onChange: this.handleInputChange }),
                    React.createElement('i', null)
                )
            );
        }
    }]);

    return TimeInput;
}(Component);

TimeInput.defaultProps = {
    simple: false,
    className: '',
    placeHolder: 'input time'
};

module.exports = timeInputCmp(TimeInput);