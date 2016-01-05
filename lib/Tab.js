'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Tab = _react2.default.createClass({
    displayName: 'Tab',

    propTypes: {
        position: _react2.default.PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
        onSelect: _react2.default.PropTypes.func
    },
    getDefaultProps: function getDefaultProps() {
        return {
            selectedIndex: 0,
            position: 'bottom'
        };
    },
    getInitialState: function getInitialState() {
        return {
            index: this.props.selectedIndex
        };
    },
    handleItemClick: function handleItemClick(index) {
        if (this.props.onSelect) this.props.onSelect(index);
        this.setState({
            index: index
        });
    },
    makeTabItems: function makeTabItems(content) {
        var _this = this;

        var NODES = content.props.children,
            INDEX = this.state.index;
        var itemNodes = _react2.default.Children.map(NODES, function (node, index) {
            var active = index == INDEX ? '_active' : '';
            return _react2.default.createElement(
                'div',
                { className: '_item ' + active, onClick: function onClick() {
                        return _this.handleItemClick(index);
                    } },
                node
            );
        });
        return itemNodes;
    },
    render: function render() {
        var content = this.makeTabItems(this.props.items);
        return _react2.default.createElement(
            'div',
            { className: 'ui tab ' + this.props.position, style: this.props.style },
            content
        );
    }
});

exports.default = Tab;