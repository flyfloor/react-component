'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Radio = require('./Radio');

var _Radio2 = _interopRequireDefault(_Radio);

var _className = require('./util/className');

var _className2 = _interopRequireDefault(_className);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RadioGroup = _react2.default.createClass({
    displayName: 'RadioGroup',

    propTypes: {
        options: _react2.default.PropTypes.array,
        value: _react2.default.PropTypes.string,
        labelName: _react2.default.PropTypes.string,
        valueName: _react2.default.PropTypes.string,
        onChange: _react2.default.PropTypes.func,
        defaultChecked: _react2.default.PropTypes.bool
    },
    getInitialState: function getInitialState() {
        var _props = this.props,
            options = _props.options,
            value = _props.value;

        return { options: options, value: value };
    },
    getDefaultProps: function getDefaultProps() {
        return {
            labelName: 'name',
            valueName: 'value',
            options: []
        };
    },
    toggleChange: function toggleChange(e, value) {
        var _this = this;

        this.setState({ value: value }, function () {
            if (_this.props.onChange) _this.props.onChange(_this.state.value);
        });
    },
    componentDidMount: function componentDidMount() {
        var _props2 = this.props,
            defaultChecked = _props2.defaultChecked,
            valueName = _props2.valueName;
        var _state = this.state,
            value = _state.value,
            options = _state.options;

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

        var _props3 = this.props,
            labelName = _props3.labelName,
            valueName = _props3.valueName,
            className = _props3.className,
            style = _props3.style,
            children = _props3.children;

        className = (0, _className2.default)(className, 'radio-group');
        var _state2 = this.state,
            value = _state2.value,
            options = _state2.options;

        var optionNodes = [],
            itemChecked = void 0;

        if (children) {
            _react2.default.Children.map(children, function (node, i) {
                itemChecked = node.props.value === value;
                if ((value === null || value === undefined) && node.props.checked) itemChecked = true;
                optionNodes.push(_react2.default.createElement(_Radio2.default, _extends({ key: i }, node.props, { checked: itemChecked, onChange: _this2.toggleChange })));
            });
        } else {
            for (var i = 0; i < options.length; i++) {
                var item = options[i];
                itemChecked = item[valueName] === value;
                optionNodes.push(_react2.default.createElement(
                    _Radio2.default,
                    { key: item[valueName], value: item[valueName], disabled: item.disabled,
                        checked: itemChecked, onChange: this.toggleChange },
                    item[labelName]
                ));
            }
        }

        return _react2.default.createElement(
            'div',
            { style: style, className: className },
            optionNodes
        );
    }
});

exports.default = RadioGroup;