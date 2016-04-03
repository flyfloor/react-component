'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
    value: true
});
var React = require('react');
var CheckBox = require('./CheckBox');

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
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = this.state.value[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var item = _step.value;

                if (item === val) {
                    flag = true;
                    break;
                }
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        if (!flag) {
            this.setState({
                value: this.state.value.concat(val)
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
                return React.createElement(CheckBox, _extends({ key: i, checked: checked }, node.props, { onChange: _this.handleChange }));
            });
        } else {
            var itemNode = null;
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = options[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var item = _step2.value;

                    var itemChecked = false;
                    var _iteratorNormalCompletion3 = true;
                    var _didIteratorError3 = false;
                    var _iteratorError3 = undefined;

                    try {
                        for (var _iterator3 = value[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                            var val = _step3.value;

                            if (item[valueName] === val) {
                                itemChecked = true;
                                break;
                            }
                        }
                    } catch (err) {
                        _didIteratorError3 = true;
                        _iteratorError3 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                _iterator3.return();
                            }
                        } finally {
                            if (_didIteratorError3) {
                                throw _iteratorError3;
                            }
                        }
                    }

                    itemNode = React.createElement(
                        CheckBox,
                        { key: item[valueName], value: item[valueName],
                            checked: itemChecked, onChange: this.handleChange },
                        item[labelName]
                    );
                    optionNodes.push(itemNode);
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }

        return React.createElement(
            'div',
            { style: style, className: className },
            optionNodes
        );
    }
});

module.exports = CheckBoxGroup;