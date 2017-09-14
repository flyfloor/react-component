'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var Component = React.Component;
var PropTypes = require('prop-types');
var klassName = require('./util/className');

var Radio = function (_Component) {
    _inherits(Radio, _Component);

    function Radio(props) {
        _classCallCheck(this, Radio);

        var _this = _possibleConstructorReturn(this, (Radio.__proto__ || Object.getPrototypeOf(Radio)).call(this, props));

        _this.checkedChange = _this.checkedChange.bind(_this);
        return _this;
    }

    _createClass(Radio, [{
        key: 'checkedChange',
        value: function checkedChange(e) {
            var _props = this.props,
                value = _props.value,
                onChange = _props.onChange;

            if (onChange) onChange(e, value);
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                className = _props2.className,
                checked = _props2.checked,
                disabled = _props2.disabled,
                style = _props2.style,
                children = _props2.children;

            className = klassName(className, 'radio');
            if (disabled) {
                className = className + ' _disabled';
            }
            return React.createElement(
                'label',
                { style: style, className: className },
                React.createElement('input', { type: 'radio',
                    disabled: disabled,
                    checked: checked,
                    onChange: this.checkedChange }),
                React.createElement(
                    'span',
                    null,
                    children
                )
            );
        }
    }]);

    return Radio;
}(Component);

Radio.propTypes = {
    onChange: PropTypes.func,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    className: PropTypes.string
};

Radio.defaultProps = {
    className: ''
};

module.exports = Radio;