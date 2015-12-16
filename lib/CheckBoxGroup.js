'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var React = require('react');
var CheckBox = require('./CheckBox');

var CheckBoxGroup = exports.CheckBoxGroup = React.createClass({
    displayName: 'CheckBoxGroup',
    getInitialState: function getInitialState() {
        return {
            value: this.props.value,
            options: this.props.options
        };
    },
    getDefaultProps: function getDefaultProps() {
        return {
            value: [],
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
    handleChange: function handleChange(e, storeValue) {
        e.target.checked ? this.addVal(storeValue) : this.removeVal(storeValue);
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
        };
    },
    removeVal: function removeVal(val) {
        var index = this.state.value.indexOf(val);
        if (index > -1) {
            this.state.value.splice(index, 1);
            this.setState({
                value: this.state.value
            }, this.valueChange);
        };
    },
    valueChange: function valueChange() {
        if (this.props.onChange) this.props.onChange(this.state.value);
    },
    render: function render() {
        var _props$labelName = this.props.labelName;
        var labelName = _props$labelName === undefined ? 'name' : _props$labelName;
        var _props$valueName = this.props.valueName;
        var valueName = _props$valueName === undefined ? 'value' : _props$valueName;

        var optionNodes = [],
            itemNode = undefined,
            valArr = undefined;
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = this.state.options[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var item = _step2.value;

                var itemChecked = false;
                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;

                try {
                    for (var _iterator3 = this.state.value[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
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
                    { key: item[valueName], storeValue: item[valueName], checked: itemChecked, onChange: this.handleChange },
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

        return React.createElement(
            'div',
            { style: this.props.style, className: this.props.className },
            optionNodes
        );
    }
});

module.exports = CheckBoxGroup;