'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var CheckBox = require('./CheckBox');
var klassName = require('./util/className');
var UpdatePropsMixin = require('./mixin/UpdatePropsMixin');

var CheckBoxGroup = React.createClass({
    displayName: 'CheckBoxGroup',

    mixins: [UpdatePropsMixin],
    getInitialState: function getInitialState() {
        var value = this.props.value;

        return { value: value };
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