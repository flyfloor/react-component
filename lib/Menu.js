'use strict';

var React = require('react');
var Item = require('./Item.js');
var DocumentClickMixin = require('./mixin/DocumentClickMixin');

var Menu = React.createClass({
    displayName: 'Menu',

    mixins: [DocumentClickMixin],

    propTypes: {
        onSelect: React.PropTypes.func
    },

    getInitialState: function getInitialState() {
        return {
            open: false,
            index: this.props.selectedIndex
        };
    },

    toggleOpen: function toggleOpen() {
        this.setState({
            open: !this.state.open
        });
    },
    openMenu: function openMenu() {
        this.setState({
            open: true
        });
    },
    closeMenu: function closeMenu() {
        this.setState({
            open: false
        });
    },
    handleItemClick: function handleItemClick(index) {
        if (this.props.onSelect) this.props.onSelect(index);
        this.setState({
            open: false,
            index: index
        });
    },
    onOtherDomClick: function onOtherDomClick(e) {
        this.closeMenu();
    },
    makeMenuItems: function makeMenuItems(content) {
        var _this = this;

        var NODES = content.props.children,
            INDEX = this.state.index;
        var itemNodes = [];
        if (NODES instanceof Array) {
            itemNodes = NODES.map(function (node, index) {
                return React.createElement(
                    Item,
                    { key: index, selected: index == INDEX, itemIndex: index, onItemClick: _this.handleItemClick },
                    node.props.children
                );
            });
        }
        return itemNodes;
    },
    render: function render() {
        var content = this.state.open ? React.createElement(
            'div',
            { className: '_content' },
            this.makeMenuItems(this.props.items)
        ) : null;
        var triggerDOM = this.state.open && this.props.triggerOn ? this.props.triggerOn : this.props.children;
        var menuNode = this.props.triggerType === 'click' ? React.createElement(
            'span',
            { className: 'ui menu', style: this.props.style },
            React.createElement(
                'span',
                { className: '_trigger', onClick: this.toggleOpen },
                triggerDOM
            ),
            React.createElement(
                'div',
                { className: '_wrap' },
                content
            )
        ) : React.createElement(
            'span',
            { className: 'ui menu', style: this.props.style, onMouseOver: this.openMenu, onMouseLeave: this.closeMenu },
            React.createElement(
                'span',
                { className: '_trigger' },
                triggerDOM
            ),
            React.createElement(
                'div',
                { className: '_wrap' },
                content
            )
        );

        return menuNode;
    }
});

Menu.Item = Item;
module.exports = Menu;