'use strict';

var React = require('react');
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
        var onSelect = this.props.onSelect;

        if (onSelect) onSelect(index);
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

        var NODES = content.props.children;
        var index = this.state.index;

        var active = '';

        var itemNodes = React.Children.map(NODES, function (node, i) {
            active = i == index ? '_active' : '';
            return React.createElement(
                'div',
                { className: '_item ' + active, onClick: function onClick() {
                        return _this.handleItemClick(i);
                    } },
                node
            );
        });

        return itemNodes;
    },
    render: function render() {
        var open = this.state.open;
        var _props = this.props;
        var items = _props.items;
        var triggerOn = _props.triggerOn;
        var children = _props.children;
        var triggerType = _props.triggerType;
        var style = _props.style;

        var content = open ? React.createElement(
            'div',
            { className: '_content' },
            this.makeMenuItems(items)
        ) : null;
        var triggerDOM = open && triggerOn ? triggerOn : children;
        var menuNode = triggerType === 'click' ? React.createElement(
            'span',
            { className: 'ui menu', style: style },
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
            { className: 'ui menu', style: style, onMouseOver: this.openMenu, onMouseLeave: this.closeMenu },
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

module.exports = Menu;