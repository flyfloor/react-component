'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Item = _react2.default.createClass({
    displayName: 'Item',

    propTypes: {
        children: _react2.default.PropTypes.node
    },
    getDefaultProps: function getDefaultProps() {
        return {
            className: ''
        };
    },
    render: function render() {
        var children = this.props.children;

        return _react2.default.createElement(
            'div',
            this.props,
            children
        );
    }
});

exports.default = Item;