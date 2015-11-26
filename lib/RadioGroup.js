'use strict';

var React = require('react');
var Radio = require('./Radio');

var RadioGroup = React.createClass({
    displayName: 'RadioGroup',

    propTypes: {
        options: React.PropTypes.array,
        value: React.PropTypes.string,
        labelName: React.PropTypes.string,
        valueName: React.PropTypes.string,
        onChange: React.PropTypes.func
    },
    getInitialState: function getInitialState() {
        return {
            options: this.props.options || [],
            value: this.props.value
        };
    },
    toggleChange: function toggleChange(e, storeValue) {
        var _this = this;

        this.setState({
            value: storeValue
        }, function () {
            if (_this.props.onChange) _this.props.onChange(_this.state.value);
        });
    },
    componentDidMount: function componentDidMount() {
        if (this.props.defaultChecked && !this.state.value && this.state.options.length > 0) {
            this.setState({
                value: this.state.options[0][this.props.valueName]
            });
        };
    },
    render: function render() {
        var _props$labelName = this.props.labelName;
        var labelName = _props$labelName === undefined ? 'name' : _props$labelName;
        var _props$valueName = this.props.valueName;
        var valueName = _props$valueName === undefined ? 'value' : _props$valueName;

        var optionNodes = [],
            itemChecked = undefined,
            itemNode = undefined;

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = this.state.options[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var item = _step.value;

                itemChecked = item[valueName] === this.state.value;
                itemNode = React.createElement(
                    Radio,
                    { key: item[valueName], storeValue: item[valueName], checked: itemChecked, onChange: this.toggleChange },
                    item[labelName]
                );
                optionNodes.push(itemNode);
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

        return React.createElement(
            'div',
            { style: this.props.style, className: this.props.className },
            optionNodes
        );
    }
});

module.exports = RadioGroup;