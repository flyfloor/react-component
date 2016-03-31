'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var ReactDOM = require('react-dom');
var Item = require('./Item');
var DocumentClickMixin = require('./mixin/DocumentClickMixin');

var Menu = React.createClass({
    displayName: 'Menu',

    mixins: [DocumentClickMixin],

    propTypes: {
        onSelect: React.PropTypes.func,
        mutex: React.PropTypes.bool,
        popped: React.PropTypes.bool,
        trigger: React.PropTypes.oneOf(['click', 'hover'])
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
            open: false,
            current: current,
            trigger: 'hover'
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
    toggleSubMenu: function toggleSubMenu(index) {
        var mutex = this.props.mutex;

        var node = ReactDOM.findDOMNode(this.refs[index]);
        if (mutex) {
            var base = ReactDOM.findDOMNode(this);
            var subMenuNodes = base.querySelectorAll('.sub-menu');
            var length = subMenuNodes.length;
            for (var i = 0; i < length; i++) {
                if (node === subMenuNodes[i]) continue;
                subMenuNodes[i].className = subMenuNodes[i].className.replace(' _active', '');
            }
        }
        var className = node.className;
        className = className.indexOf(' _active') !== -1 ? className.replace(' _active', '') : className + ' _active';

        node.className = className;
    },
    handleItemClick: function handleItemClick(index) {
        var onSelect = this.props.onSelect;

        if (onSelect) onSelect(index);
        this.setState({
            open: false,
            current: index
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
        this.closeMenu();
    },
    render: function render() {
        var _this = this;

        var _state = this.state;
        var open = _state.open;
        var current = _state.current;
        var _props = this.props;
        var children = _props.children;
        var style = _props.style;
        var className = _props.className;
        var popped = _props.popped;

        var selected = false;
        if (popped) className = className + ' _popped';

        var menuNode = React.Children.map(children, function (item, i) {
            var _item$props = item.props;
            var sub = _item$props.sub;
            var children = _item$props.children;
            var className = _item$props.className;
            var index = _item$props.index;
            var title = _item$props.title;
            var open = _item$props.open;

            if (index === null || index === undefined) return console.error('index is needed for children of menu');

            selected = index === current;
            className = selected ? className + ' _active' : className;
            className = [className];
            className.push('_item');
            if (sub) className.push('sub-menu');
            className = className.join(' ');

            if (sub) {
                return React.createElement(
                    'div',
                    { className: className, key: 'item-' + i, ref: index },
                    sub ? React.createElement(
                        'div',
                        { className: '_title _item', onClick: function onClick() {
                                return _this.toggleSubMenu(index);
                            } },
                        title
                    ) : null,
                    React.createElement(
                        Menu,
                        _extends({}, children.props, { current: current, onSelect: _this.handleItemClick }),
                        children.props.children
                    )
                );
            }

            className = className + ' _child';

            return React.createElement(
                'div',
                { className: className, key: 'item-' + i, onClick: function onClick() {
                        return _this.handleItemClick(index);
                    } },
                children
            );
        });

        return React.createElement(
            'div',
            { className: 'ui menu ' + className, style: style },
            menuNode
        );
    }
});

module.exports = Menu;