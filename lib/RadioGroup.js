'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var Radio = require('./Radio');
var klassName = require('./util/className');
var UpdatePropsMixin = require('./mixin/UpdatePropsMixin');

var RadioGroup = React.createClass({
    displayName: 'RadioGroup',

    mixins: [UpdatePropsMixin],
    propTypes: {
        options: React.PropTypes.array,
        value: React.PropTypes.string,
        labelName: React.PropTypes.string,
        valueName: React.PropTypes.string,
        onChange: React.PropTypes.func,
        defaultChecked: React.PropTypes.bool
    },
    getInitialState: function getInitialState() {
        var value = this.props.value;

        return { value: value };
    },
    getDefaultProps: function getDefaultProps() {
        return {
            labelName: 'name',
            valueName: 'value'
        };
    },
    toggleChange: function toggleChange(e, value) {
        var _this = this;

        this.setState({ value: value }, function () {
            if (_this.props.onChange) _this.props.onChange(_this.state.value);
        });
    },
    componentDidMount: function componentDidMount() {
        var _props = this.props,
            defaultChecked = _props.defaultChecked,
            options = _props.options,
            valueName = _props.valueName;
        var value = this.state.value;
        // init defaultChecked status

        if ((value === null || value === undefined) && defaultChecked) {
            if (options.length > 0) {
                this.setState({
                    value: options[0][valueName]
                });
            }
        }
    },
    render: function render() {
        var _this2 = this;

        var _props2 = this.props,
            labelName = _props2.labelName,
            valueName = _props2.valueName,
            options = _props2.options,
            className = _props2.className,
            style = _props2.style,
            children = _props2.children;

        className = klassName(className, 'radio-group');
        var value = this.state.value;

        var optionNodes = [],
            itemChecked = void 0;

        if (children) {
            React.Children.map(children, function (node, i) {
                itemChecked = node.props.value === value;
                if ((value === null || value === undefined) && node.props.checked) itemChecked = true;
                optionNodes.push(React.createElement(Radio, _extends({ key: i }, node.props, { checked: itemChecked, onChange: _this2.toggleChange })));
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
});

module.exports = RadioGroup;