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
            className: ''
        };
    },


    getInitialState: function getInitialState() {
        var current = this.props.current;

        return {
            current: current,
            mode: 'click'
        };
    },

    closeSubMenu: function closeSubMenu(node) {
        var _props = this.props;
        var popped = _props.popped;
        var mode = _props.mode;

        if (popped || mode === 'hover') {
            var base = node || ReactDOM.findDOMNode(this.refs.base);
            var activeNodes = base.querySelectorAll('.sub-menu._active');
            var length = activeNodes.length;
            for (var i = 0; i < length; i++) {
                activeNodes[i].className = activeNodes[i].className.replace(' _active', '');
            }
        }
    },
    toggleSubMenu: function toggleSubMenu(index) {
        var _props2 = this.props;
        var mutex = _props2.mutex;
        var popped = _props2.popped;

        var node = ReactDOM.findDOMNode(this.refs[index]);
        var active = hasClass(node, '_active');
        if (mutex || popped) {
            var base = ReactDOM.findDOMNode(this.refs.base);
            removeClass(base.querySelectorAll('.sub-menu'), '_active');
        }
        if (active && !popped) {
            removeClass(node, '_active');
        } else {
            addClass(node, '_active');
        }
        // !active && !mutex ? addClass(node, '_active') : toggleClass(node, '_active');
    },
    handleItemClick: function handleItemClick(index) {
        var _this = this;

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
    render: function render() {
        var _this2 = this;

        var current = this.state.current;
        var _props3 = this.props;
        var children = _props3.children;
        var style = _props3.style;
        var className = _props3.className;
        var popped = _props3.popped;
        var mutex = _props3.mutex;
        var mode = _props3.mode;

        var selected = false;
        if (popped) className = className + ' _popped';

        var menuNode = React.Children.map(children, function (item, i) {
            var _item$props = item.props;
            var sub = _item$props.sub;
            var children = _item$props.children;
            var className = _item$props.className;
            var index = _item$props.index;
            var title = _item$props.title;
            var active = _item$props.active;

            if (index === null || index === undefined) return console.error('index is needed for children of menu');

            selected = index === current;
            className = [className];
            className.push('_item');

            if (sub) {
                className.push('sub-menu');
                if (active) className.push('_active');
                className = className.join(' ');
                var subMenuNodes = React.createElement(
                    Menu,
                    _extends({}, children.props, { mutex: mutex, popped: popped,
                        current: current, onSelect: _this2.handleItemClick }),
                    children.props.children
                );

                return React.createElement(
                    'div',
                    { className: className, key: 'item-' + i, ref: index },
                    sub ? React.createElement(
                        'div',
                        { className: '_title _item', onClick: function onClick() {
                                return _this2.toggleSubMenu(index);
                            } },
                        title
                    ) : null,
                    subMenuNodes
                );
            }

            className.push(' _child');
            if (selected) className.push(' _active');
            className = className.join(' ');

            return React.createElement(
                'div',
                { className: className, key: 'item-' + i, onClick: function onClick() {
                        return _this2.handleItemClick(index);
                    } },
                children
            );
        });

        return React.createElement(
            'div',
            { ref: 'base', className: 'ui menu ' + className, style: style },
            menuNode
        );
    }
});

module.exports = Menu;