'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var Component = React.Component;
var PropTypes = require('prop-types');

var Radio = require('./Radio');
var klassName = require('./util/className');
var defaultCheckedCmp = require('./high-order/defaultCheckedCmp');

var RadioGroup = function (_Component) {
    _inherits(RadioGroup, _Component);

    function RadioGroup(props) {
        _classCallCheck(this, RadioGroup);

        var _this = _possibleConstructorReturn(this, (RadioGroup.__proto__ || Object.getPrototypeOf(RadioGroup)).call(this, props));

        _this.toggleChange = _this.toggleChange.bind(_this);

        var value = props.value;

        _this.state = {
            value: value
        };
        return _this;
    }

    _createClass(RadioGroup, [{
        key: 'toggleChange',
        value: function toggleChange(e, value) {
            var _this2 = this;

            this.setState({ value: value }, function () {
                var onChange = _this2.props.onChange;

                if (onChange) onChange(_this2.state.value);
            });
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var defaultChecked = this.props.defaultChecked;

            this.optionsChangeReInitValue({
                defaultChecked: defaultChecked,
                nextProps: nextProps,
                multi: false
            });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var value = this.state.value;
            var defaultChecked = this.props.defaultChecked;

            if (!value && defaultChecked) {
                this.initDefaultCheckedValue();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _props = this.props,
                labelName = _props.labelName,
                valueName = _props.valueName,
                options = _props.options,
                className = _props.className,
                style = _props.style,
                children = _props.children;

            className = klassName(className, 'radio-group');
            var value = this.state.value;

            var optionNodes = [],
                itemChecked = void 0;

            if (children) {
                React.Children.map(children, function (node, i) {
                    itemChecked = node.props.value === value;
                    if ((value === null || value === undefined) && node.props.checked) itemChecked = true;
                    optionNodes.push(React.createElement(Radio, _extends({ key: i }, node.props, { checked: itemChecked, onChange: _this3.toggleChange })));
                });
            } else {
                for (var i = 0; i < options.length; i++) {
                    var item = options[i];
                    itemChecked = item[valueName] === value;
                    optionNodes.push(React.createElement(
                        Radio,
                        { key: item[valueName], value: item[valueName], disabled: item.disabled,
                            checked: itemChecked, onChange: this.toggleChange },
                        item[labelName]
                    ));
                }
            }

            return React.createElement(
                'div',
                { style: style, className: className },
                optionNodes
            );
        }
    }]);

    return RadioGroup;
}(Component);

RadioGroup.propTypes = {
    options: PropTypes.array,
    labelName: PropTypes.string,
    valueName: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    defaultChecked: PropTypes.bool
};

RadioGroup.defaultProps = {
    labelName: 'name',
    valueName: 'value',
    options: []
};

module.exports = defaultCheckedCmp(RadioGroup);