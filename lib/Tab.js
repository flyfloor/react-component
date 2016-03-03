'use strict';

var React = require('react');

var Tab = React.createClass({
    displayName: 'Tab',

    propTypes: {
        position: React.PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
        onSelect: React.PropTypes.func
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
        var itemNodes = React.Children.map(NODES, function (node, index) {
            var active = index == INDEX ? '_active' : '';
            return React.createElement(
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
        return React.createElement(
            'div',
            { className: 'ui tab ' + this.props.position, style: this.props.style },
            content
        );
    }
});

module.exports = Tab;