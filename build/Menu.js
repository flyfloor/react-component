const React = require('react');
const css = require("../css/menu.less");
const Item = require('./Item.js');
const DocumentClickMixin = require('../mixin/DocumentClickMixin');

const Menu = React.createClass({
    displayName: 'Menu',

    mixins: [DocumentClickMixin],

    propTypes: {
        onSelect: React.PropTypes.func
    },

    getInitialState: function () {
        return {
            open: false,
            index: this.props.selectedIndex
        };
    },

    toggleOpen() {
        this.setState({
            open: !this.state.open
        });
    },

    openMenu() {
        this.setState({
            open: true
        });
    },

    closeMenu() {
        this.setState({
            open: false
        });
    },

    handleItemClick(index) {
        if (this.props.onSelect) this.props.onSelect(index);
        this.setState({
            open: false,
            index: index
        });
    },

    onOtherDomClick(e) {
        this.closeMenu();
    },

    makeMenuItems(content) {
        const NODES = content.props.children,
              INDEX = this.state.index;
        let itemNodes = [];
        if (NODES instanceof Array) {
            itemNodes = NODES.map((node, index) => {
                return React.createElement(
                    Item,
                    { key: index, selected: index == INDEX, itemIndex: index, onItemClick: this.handleItemClick },
                    node.props.children
                );
            });
        }
        return itemNodes;
    },

    render() {
        let content = this.state.open ? React.createElement(
            'div',
            { className: '_content' },
            this.makeMenuItems(this.props.items)
        ) : null;
        let triggerDOM = this.state.open && this.props.triggerOn ? this.props.triggerOn : this.props.children;
        let menuNode = this.props.triggerType === 'click' ? React.createElement(
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