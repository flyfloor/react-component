'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var ReactDOM = require('react-dom');
var Item = require('./Item');

var _require = require('./util/dom');

var toggleClass = _require.toggleClass;
var removeClass = _require.removeClass;
var hasClass = _require.hasClass;
var addClass = _require.addClass;
var getClassList = _require.getClassList;

var DocumentClickMixin = require('./mixin/DocumentClickMixin');

var Menu = React.createClass({
    displayName: 'Menu',

    mixins: [DocumentClickMixin],

    propTypes: {
        onSelect: React.PropTypes.func,
        mutex: React.PropTypes.bool,
        popped: React.PropTypes.bool,
        mode: React.PropTypes.oneOf(['click', 'hover'])
    },

    getDefaultProps: function getDefaultProps() {
        return {
            mutex: false,
            popped: false,
            mode: 'click',
            className: ''
        };
    },


    getInitialState: function getInitialState() {
        var current = this.props.current;

        return { current: current };
    },

    closeSubMenu: function closeSubMenu(node) {
        var _props = this.props;
        var popped = _props.popped;
        var mode = _props.mode;
        var mutux = _props.mutux;

        if (popped || mode === 'hover') {
            var base = node || ReactDOM.findDOMNode(this.refs.base);
            removeClass(base.querySelectorAll('.sub-menu._active'), '_active');
        }
    },
    toggleSubMenu: function toggleSubMenu(index) {
        var _props2 = this.props;
        var mutex = _props2.mutex;
        var popped = _props2.popped;

        var node = ReactDOM.findDOMNode(this.refs[index]);
        var active = hasClass(node, '_active');
        if (mutex || popped) {
            var baseNode = ReactDOM.findDOMNode(this.refs.base);
            removeClass(baseNode.querySelectorAll('.sub-menu'), '_active');
        }
        active ? removeClass(node, '_active') : addClass(node, '_active');
        return false;
    },
    handleItemClick: function handleItemClick(index, disabled) {
        var _this = this;

        if (disabled) return;
        var onSelect = this.props.onSelect;

        if (onSelect) onSelect(index);
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
    onOtherDomClick: function onOtherDomClick(e) {
        this.closeSubMenu();
    },
    formatChild: function formatChild(node, i, _ref) {
        var _this2 = this;

        var current = _ref.current;
        var _node$props = node.props;
        var classList = _node$props.classList;
        var disabled = _node$props.disabled;
        var index = _node$props.index;
        var children = _node$props.children;

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

        var popped = _ref2.popped;
        var mutex = _ref2.mutex;
        var mode = _ref2.mode;
        var current = _ref2.current;
        var _node$props2 = node.props;
        var title = _node$props2.title;
        var index = _node$props2.index;
        var disabled = _node$props2.disabled;
        var active = _node$props2.active;
        var children = _node$props2.children;

        var className = getClassList(node.props);
        className.push('_item', 'sub-menu');
        if (active) className.push('_active');
        className = className.join(' ');
        var childNodes = React.createElement(
            Menu,
            _extends({}, children.props, { disabled: disabled, mode: mode, mutex: mutex, popped: popped,
                current: current, onSelect: this.handleItemClick }),
            children.props.children
        );

        if (mode === 'hover') {
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
    formatMenu: function formatMenu(children) {
        var _this4 = this;

        var current = this.state.current;
        var _props3 = this.props;
        var popped = _props3.popped;
        var mutex = _props3.mutex;
        var mode = _props3.mode;

        return React.Children.map(children, function (item, i) {
            var _item$props = item.props;
            var index = _item$props.index;
            var sub = _item$props.sub;

            if (index === null || index === undefined) return console.error('index is needed for children of menu');
            return sub ? _this4.formatSubMenu(item, i, { mutex: mutex, popped: popped, mode: mode, current: current }) : _this4.formatChild(item, i, { current: current });
        });
    },
    render: function render() {
        var _this5 = this;

        var _props4 = this.props;
        var children = _props4.children;
        var style = _props4.style;
        var className = _props4.className;
        var popped = _props4.popped;
        var mode = _props4.mode;

        if (popped) className = className + ' _popped';
        var menuNode = mode === 'hover' && popped ? React.createElement(
            'div',
            { onMouseLeave: function onMouseLeave() {
                    return _this5.closeSubMenu();
                }, ref: 'base',
                className: 'ui menu ' + className + ' _hover', style: style },
            this.formatMenu(children)
        ) : React.createElement(
            'div',
            { ref: 'base', className: 'ui menu ' + className, style: style },
            this.formatMenu(children)
        );

        return menuNode;
    }
});

module.exports = Menu;