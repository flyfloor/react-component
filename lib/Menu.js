'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var ReactDOM = require('react-dom');
var domUtil = require('./util/dom');
var removeClass = domUtil.removeClass,
    hasClass = domUtil.hasClass,
    addClass = domUtil.addClass,
    getClassList = domUtil.getClassList;

var DocumentClickMixin = require('./mixin/DocumentClickMixin');
var klassName = require('./util/className');

var Menu = React.createClass({
    displayName: 'Menu',

    mixins: [DocumentClickMixin],

    propTypes: {
        onChange: React.PropTypes.func,
        accordion: React.PropTypes.bool,
        popped: React.PropTypes.bool,
        horizontal: React.PropTypes.bool,
        mode: React.PropTypes.oneOf(['click', 'hover'])
    },

    getDefaultProps: function getDefaultProps() {
        return {
            accordion: false,
            popped: false,
            horizontal: false,
            mode: 'click',
            className: ''
        };
    },


    getInitialState: function getInitialState() {
        var current = this.props.current;

        return { current: current };
    },

    closeSubMenu: function closeSubMenu(node) {
        var _props = this.props,
            popped = _props.popped,
            mode = _props.mode,
            horizontal = _props.horizontal;

        if (popped || mode === 'hover' || horizontal) {
            var base = node || ReactDOM.findDOMNode(this.refs.base);
            removeClass(base.querySelectorAll('.sub-menu._active'), '_active');
        }
    },
    toggleSubMenu: function toggleSubMenu(index) {
        var _props2 = this.props,
            accordion = _props2.accordion,
            popped = _props2.popped,
            horizontal = _props2.horizontal;

        var node = ReactDOM.findDOMNode(this.refs[index]);
        var active = hasClass(node, '_active');
        if (accordion || popped || horizontal) {
            var baseNode = ReactDOM.findDOMNode(this.refs.base);
            removeClass(baseNode.querySelectorAll('.sub-menu'), '_active');
        }
        active ? removeClass(node, '_active') : addClass(node, '_active');
        return false;
    },
    handleItemClick: function handleItemClick(index, disabled) {
        var _this = this;

        if (disabled) return;
        var onChange = this.props.onChange;

        if (onChange) onChange(index);
        this.setState({
            current: index
        }, function () {
            return _this.closeSubMenu();
        });
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        if (nextProps.current !== this.props.current) {
            this.setState({
                current: nextProps.current
            });
        }
    },
    onOtherDomClick: function onOtherDomClick() {
        this.closeSubMenu();
    },
    formatChild: function formatChild(node, i, _ref) {
        var _this2 = this;

        var current = _ref.current;
        var _node$props = node.props,
            disabled = _node$props.disabled,
            index = _node$props.index,
            children = _node$props.children;

        var selected = current === index;
        var className = getClassList(node.props);
        className.push('_child', '_item');
        if (selected) className.push('_active');
        if (disabled) className.push('_disabled');
        className = className.join(' ');
        return React.createElement(
            'div',
            { className: className, key: 'item-' + i, onClick: function onClick() {
                    return _this2.handleItemClick(index, disabled);
                } },
            children
        );
    },
    formatSubMenu: function formatSubMenu(node, i, _ref2) {
        var _this3 = this;

        var popped = _ref2.popped,
            accordion = _ref2.accordion,
            mode = _ref2.mode,
            current = _ref2.current,
            horizontal = _ref2.horizontal,
            level = _ref2.level;
        var _node$props2 = node.props,
            title = _node$props2.title,
            index = _node$props2.index,
            disabled = _node$props2.disabled,
            active = _node$props2.active,
            children = _node$props2.children;

        var className = getClassList(node.props);
        className.push('_item', 'sub-menu');
        if (active) className.push('_active');
        className = className.join(' ');
        var childNodes = React.createElement(
            Menu,
            _extends({}, children.props, { disabled: disabled, mode: mode, level: level,
                horizontal: horizontal, accordion: accordion, popped: popped,
                current: current, onChange: this.handleItemClick }),
            children.props.children
        );

        if (mode === 'hover' || horizontal) {
            return React.createElement(
                'div',
                { className: className, key: 'item-' + i, ref: index },
                React.createElement(
                    'div',
                    { className: '_title _item', onMouseEnter: function onMouseEnter() {
                            return _this3.toggleSubMenu(index);
                        },
                        onClick: function onClick() {
                            return _this3.toggleSubMenu(index);
                        } },
                    title
                ),
                childNodes
            );
        }
        return React.createElement(
            'div',
            { className: className, key: 'item-' + i, ref: index },
            React.createElement(
                'div',
                { className: '_title _item', onClick: function onClick() {
                        return _this3.toggleSubMenu(index);
                    } },
                title
            ),
            childNodes
        );
    },
    formatMenu: function formatMenu(children, level) {
        var _this4 = this;

        var current = this.state.current;
        var _props3 = this.props,
            popped = _props3.popped,
            accordion = _props3.accordion,
            mode = _props3.mode,
            horizontal = _props3.horizontal;

        return React.Children.map(children, function (item, i) {
            var _item$props = item.props,
                index = _item$props.index,
                sub = _item$props.sub;

            if (index === null || index === undefined) {
                throw new Error('index is needed for children of menu');
            }
            return sub ? _this4.formatSubMenu(item, i, { accordion: accordion, popped: popped, mode: mode, current: current, horizontal: horizontal, level: level }) : _this4.formatChild(item, i, { current: current });
        });
    },
    render: function render() {
        var _this5 = this;

        var _props4 = this.props,
            children = _props4.children,
            style = _props4.style,
            className = _props4.className,
            horizontal = _props4.horizontal,
            popped = _props4.popped,
            mode = _props4.mode,
            _props4$level = _props4.level,
            level = _props4$level === undefined ? 0 : _props4$level;
        // menu deep level

        level = level + 1;
        className = klassName(className, 'menu _menu-' + level);
        if (popped) {
            className += ' _popped';
        }
        if (horizontal) {
            className += ' _horizontal';
        }
        if (!horizontal && !popped) {
            className += ' _default';
        }

        var menuNode = mode === 'hover' && popped || horizontal ? React.createElement(
            'div',
            { onMouseLeave: function onMouseLeave() {
                    return _this5.closeSubMenu();
                }, ref: 'base',
                className: 'menu ' + className + ' _hover', style: style },
            this.formatMenu(children, level)
        ) : React.createElement(
            'div',
            { ref: 'base', className: className, style: style },
            this.formatMenu(children, level)
        );

        return menuNode;
    }
});

module.exports = Menu;