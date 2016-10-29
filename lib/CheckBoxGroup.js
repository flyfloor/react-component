'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var CheckBox = require('./CheckBox');
var klassName = require('./util/className');

var CheckBoxGroup = exports.CheckBoxGroup = React.createClass({
    displayName: 'CheckBoxGroup',
    getInitialState: function getInitialState() {
        var _props = this.props;
        var value = _props.value;
        var options = _props.options;

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
        vaule: React.PropTypes.string,
        options: React.PropTypes.array,
        labelName: React.PropTypes.string,
        valueName: React.PropTypes.string,
        onChange: React.PropTypes.func
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

        var _props2 = this.props;
        var labelName = _props2.labelName;
        var valueName = _props2.valueName;
        var className = _props2.className;
        var style = _props2.style;
        var children = _props2.children;
        var _state = this.state;
        var options = _state.options;
        var value = _state.value;

        var optionNodes = [];

        if (children) {
            optionNodes = React.Children.map(children, function (node, i) {
                var checked = value.indexOf(node.props.value) > -1;
                return React.createElement(CheckBox, _extends({ key: i }, node.props, { checked: checked, onChange: _this.handleChange }));
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
});

module.exports = CheckBoxGroup;