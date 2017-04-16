'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var Component = React.Component;
var PropTypes = require('prop-types');
var klassName = require('./util/className');

var CheckBox = function (_Component) {
    _inherits(CheckBox, _Component);

    function CheckBox(props) {
        _classCallCheck(this, CheckBox);

        var _this = _possibleConstructorReturn(this, (CheckBox.__proto__ || Object.getPrototypeOf(CheckBox)).call(this, props));

        _this.checkedChange = _this.checkedChange.bind(_this);
        _this.state = {
            checked: props.checked
        };
        return _this;
    }

    _createClass(CheckBox, [{
        key: 'checkedChange',
        value: function checkedChange(e) {
            var _props = this.props,
                onChange = _props.onChange,
                value = _props.value;

            this.setState({
                checked: e.target.checked
            });
            if (onChange) onChange(e, value);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.checked !== this.props.checked) {
                this.setState({
                    checked: nextProps.checked
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                disabled = _props2.disabled,
                style = _props2.style,
                className = _props2.className,
                children = _props2.children;

            if (disabled) {
                className = klassName('disabled', className);
            }
            className = klassName(className, 'checkbox');
            var checked = this.state.checked;

            return React.createElement(
                'label',
                { style: style, className: className },
                React.createElement('input', { type: 'checkbox', disabled: disabled,
                    checked: checked, onChange: this.checkedChange }),
                React.createElement(
                    'span',
                    null,
                    children
                )
            );
        }
    }]);

    return CheckBox;
}(Component);

CheckBox.propTypes = {
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    checked: PropTypes.bool,
    className: PropTypes.string
};

CheckBox.defaultProps = {
    className: '',
    checked: false
};

module.exports = CheckBox;