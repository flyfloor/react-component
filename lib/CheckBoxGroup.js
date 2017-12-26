'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var Component = React.Component;
var PropTypes = require('prop-types');
var CheckBox = require('./CheckBox');
var klassName = require('./util/className');
var defaultCheckedCmp = require('./high-order/defaultCheckedCmp');

var CheckBoxGroup = function (_Component) {
    _inherits(CheckBoxGroup, _Component);

    function CheckBoxGroup(props) {
        _classCallCheck(this, CheckBoxGroup);

        var _this = _possibleConstructorReturn(this, (CheckBoxGroup.__proto__ || Object.getPrototypeOf(CheckBoxGroup)).call(this, props));

        _this.handleChange = _this.handleChange.bind(_this);
        _this.addVal = _this.addVal.bind(_this);
        _this.removeVal = _this.removeVal.bind(_this);
        _this.valueChange = _this.valueChange.bind(_this);

        var value = props.value;

        _this.state = {
            value: value
        };
        return _this;
    }

    _createClass(CheckBoxGroup, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var value = this.state.value;
            var defaultChecked = this.props.defaultChecked;

            if (value.length === 0 && defaultChecked) {
                this.initDefaultCheckedValue({ multi: true });
            }
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var defaultChecked = this.props.defaultChecked;

            this.optionsChangeReInitValue({
                nextProps: nextProps,
                defaultChecked: defaultChecked,
                multi: true
            });
        }
    }, {
        key: 'handleChange',
        value: function handleChange(e, val) {
            e.target.checked ? this.addVal(val) : this.removeVal(val);
        }
    }, {
        key: 'addVal',
        value: function addVal(val) {
            var flag = false;
            var value = this.state.value;

            for (var i = 0; i < value.length; i++) {
                if (val === value[i]) {
                    flag = true;
                    break;
                }
            }
            if (!flag) {
                this.setState({
                    value: value.concat(val)
                }, this.valueChange);
            }
        }
    }, {
        key: 'removeVal',
        value: function removeVal(val) {
            var index = this.state.value.indexOf(val);
            if (index > -1) {
                this.state.value.splice(index, 1);
                this.setState({
                    value: this.state.value
                }, this.valueChange);
            }
        }
    }, {
        key: 'valueChange',
        value: function valueChange() {
            this.props.onChange(this.state.value);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                labelName = _props.labelName,
                valueName = _props.valueName,
                className = _props.className,
                options = _props.options,
                style = _props.style,
                children = _props.children;
            var value = this.state.value;

            var optionNodes = [];

            if (children) {
                optionNodes = React.Children.map(children, function (node, i) {
                    var checked = value.indexOf(node.props.value) > -1;
                    return React.createElement(CheckBox, _extends({ key: i }, node.props, { checked: checked, onChange: _this2.handleChange }));
                });
            } else {
                var itemNode = null;
                for (var i = 0; i < options.length; i++) {
                    var itemChecked = false;
                    var item = options[i];
                    for (var j = 0; j < value.length; j++) {
                        if (value[j] === item[valueName]) {
                            itemChecked = true;
                            break;
                        }
                    }
                    itemNode = React.createElement(
                        CheckBox,
                        { key: item[valueName], value: item[valueName], disabled: item.disabled,
                            checked: itemChecked, onChange: this.handleChange },
                        item[labelName]
                    );
                    optionNodes.push(itemNode);
                }
            }

            return React.createElement(
                'div',
                { style: style, className: klassName(className, 'checkbox-group') },
                optionNodes
            );
        }
    }]);

    return CheckBoxGroup;
}(Component);

CheckBoxGroup.defaultProps = {
    value: [],
    labelName: 'name',
    valueName: 'value',
    options: []
};

CheckBoxGroup.propTypes = {
    options: PropTypes.array,
    labelName: PropTypes.string,
    valueName: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    defaultChecked: PropTypes.bool
};

module.exports = defaultCheckedCmp(CheckBoxGroup);