'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var Component = React.Component;
var PropTypes = require('prop-types');
var ReactCssTransitionGroup = require('react-addons-css-transition-group');
var formatDate = require('./util/datetime').formatDate;
var documentClickCmp = require('./high-order/documentClickCmp');
var Calendar = require('./Calendar');
var klassName = require('./util/className');

var _DATE_FORMAT = {
    day: 'yyyy-MM-dd',
    month: 'yyyy-MM',
    year: 'yyyy'
};

var DatePicker = function (_Component) {
    _inherits(DatePicker, _Component);

    function DatePicker(props) {
        _classCallCheck(this, DatePicker);

        var _this = _possibleConstructorReturn(this, (DatePicker.__proto__ || Object.getPrototypeOf(DatePicker)).call(this, props));

        _this.handleValChange = _this.handleValChange.bind(_this);

        var value = _this.initDate();
        _this.state = {
            value: value,
            open: false
        };
        return _this;
    }

    _createClass(DatePicker, [{
        key: 'initDate',
        value: function initDate() {
            var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props.value;

            if (!date) {
                return;
            }
            return new Date(date.getTime());
        }
    }, {
        key: 'onOtherDomClick',
        value: function onOtherDomClick() {
            this.setState({
                open: false
            });
        }
    }, {
        key: 'handleValChange',
        value: function handleValChange(value) {
            this.setState({
                value: value,
                open: false
            });
            this.props.onChange(new Date(value.getTime()));
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.value !== this.props.value) {
                this.setState({
                    value: this.initDate(nextProps.value)
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _state = this.state,
                open = _state.open,
                value = _state.value;
            var _props = this.props,
                begin = _props.begin,
                end = _props.end,
                className = _props.className,
                placeHolder = _props.placeHolder,
                showPreview = _props.showPreview,
                format = _props.format,
                type = _props.type,
                _onClick = _props.onClick,
                onBlur = _props.onBlur,
                onFocus = _props.onFocus;

            format = format || _DATE_FORMAT[type];
            var valueStr = value ? formatDate(value, format) : '';
            if (open) className += ' _active';
            return React.createElement(
                'div',
                { className: klassName('datepicker', className) },
                React.createElement(
                    'div',
                    { className: 'input', onClick: function onClick() {
                            _this2.setState({ open: true });
                            if (_onClick) _onClick();
                        } },
                    React.createElement('input', { type: 'text', className: '_input', onFocus: onFocus, onBlur: onBlur,
                        value: valueStr, readOnly: true, placeholder: placeHolder }),
                    React.createElement('i', null)
                ),
                React.createElement(
                    ReactCssTransitionGroup,
                    { className: '_picker', transitionName: 'datepicker',
                        transitionEnterTimeout: 200, transitionLeaveTimeout: 200 },
                    open ? React.createElement(Calendar, { begin: begin, end: end,
                        type: type, showPreview: showPreview,
                        value: value, onChange: this.handleValChange }) : null
                )
            );
        }
    }]);

    return DatePicker;
}(Component);

DatePicker.propTypes = {
    onChange: PropTypes.func.isRequired,
    onClick: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    showPreview: PropTypes.bool,
    format: PropTypes.string,
    value: PropTypes.instanceOf(Date),
    type: PropTypes.oneOf(['day', 'month', 'year'])
};

DatePicker.defaultProps = {
    className: '',
    placeHolder: 'select date',
    showPreview: true,
    type: 'day'
};

module.exports = documentClickCmp(DatePicker);