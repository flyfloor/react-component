'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _CheckBox = require('./CheckBox');

var _CheckBox2 = _interopRequireDefault(_CheckBox);

var _className = require('./util/className');

var _className2 = _interopRequireDefault(_className);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CheckBoxGroup = _react2.default.createClass({
    displayName: 'CheckBoxGroup',
    getInitialState: function getInitialState() {
        var _props = this.props,
            value = _props.value,
            options = _props.options;

        return { value: value, options: options };
    },
    getDefaultProps: function getDefaultProps() {
        return {
            value: [],
            labelName: 'name',
            valueName: 'value',
            options: []
        };
    },

    propTypes: {
        vaule: _react2.default.PropTypes.string,
        options: _react2.default.PropTypes.array,
        labelName: _react2.default.PropTypes.string,
        valueName: _react2.default.PropTypes.string,
        onChange: _react2.default.PropTypes.func
    },

    handleChange: function handleChange(e, val) {
        e.target.checked ? this.addVal(val) : this.removeVal(val);
    },
    addVal: function addVal(val) {
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
    },
    removeVal: function removeVal(val) {
        var index = this.state.value.indexOf(val);
        if (index > -1) {
            this.state.value.splice(index, 1);
            this.setState({
                value: this.state.value
            }, this.valueChange);
        }
    },
    valueChange: function valueChange() {
        var onChange = this.props.onChange;

        if (onChange) onChange(this.state.value);
    },
    render: function render() {
        var _this = this;

        var _props2 = this.props,
            labelName = _props2.labelName,
            valueName = _props2.valueName,
            className = _props2.className,
            style = _props2.style,
            children = _props2.children;
        var _state = this.state,
            options = _state.options,
            value = _state.value;

        var optionNodes = [];

        if (children) {
            optionNodes = _react2.default.Children.map(children, function (node, i) {
                var checked = value.indexOf(node.props.value) > -1;
                return _react2.default.createElement(_CheckBox2.default, _extends({ key: i }, node.props, { checked: checked, onChange: _this.handleChange }));
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
                itemNode = _react2.default.createElement(
                    _CheckBox2.default,
                    { key: item[valueName], value: item[valueName], disabled: item.disabled,
                        checked: itemChecked, onChange: this.handleChange },
                    item[labelName]
                );
                optionNodes.push(itemNode);
            }
        }

        return _react2.default.createElement(
            'div',
            { style: style, className: (0, _className2.default)(className, 'checkbox-group') },
            optionNodes
        );
    }
});

exports.default = CheckBoxGroup;