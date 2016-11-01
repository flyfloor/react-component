'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _dom = require('./util/dom');

var _DocumentClickMixin = require('./mixin/DocumentClickMixin');

var _DocumentClickMixin2 = _interopRequireDefault(_DocumentClickMixin);

var _className = require('./util/className');

var _className2 = _interopRequireDefault(_className);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Menu = _react2.default.createClass({
    displayName: 'Menu',

    mixins: [_DocumentClickMixin2.default],

    propTypes: {
        onChange: _react2.default.PropTypes.func,
        accordion: _react2.default.PropTypes.bool,
        popped: _react2.default.PropTypes.bool,
        horizontal: _react2.default.PropTypes.bool,
        mode: _react2.default.PropTypes.oneOf(['click', 'hover'])
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
            var base = node || _reactDom2.default.findDOMNode(this.refs.base);
            (0, _dom.removeClass)(base.querySelectorAll('.sub-menu._active'), '_active');
        }
    },
    toggleSubMenu: function toggleSubMenu(index) {
        var _props2 = this.props,
            accordion = _props2.accordion,
            popped = _props2.popped,
            horizontal = _props2.horizontal;

        var node = _reactDom2.default.findDOMNode(this.refs[index]);
        var active = (0, _dom.hasClass)(node, '_active');
        if (accordion || popped || horizontal) {
            var baseNode = _reactDom2.default.findDOMNode(this.refs.base);
            (0, _dom.removeClass)(baseNode.querySelectorAll('.sub-menu'), '_active');
        }
        active ? (0, _dom.removeClass)(node, '_active') : (0, _dom.addClass)(node, '_active');
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
        var className = (0, _dom.getClassList)(node.props);
        className.push('_child', '_item');
        if (selected) className.push('_active');
        if (disabled) className.push('_disabled');
        className = className.join(' ');
        return _react2.default.createElement(
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

        var className = (0, _dom.getClassList)(node.props);
        className.push('_item', 'sub-menu');
        if (active) className.push('_active');
        className = className.join(' ');
        var childNodes = _react2.default.createElement(
            Menu,
            _extends({}, children.props, { disabled: disabled, mode: mode, level: level,
                horizontal: horizontal, accordion: accordion, popped: popped,
                current: current, onChange: this.handleItemClick }),
            children.props.children
        );

        if (mode === 'hover' || horizontal) {
            return _react2.default.createElement(
                'div',
                { className: className, key: 'item-' + i, ref: index },
                _react2.default.createElement(
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
        return _react2.default.createElement(
            'div',
            { className: className, key: 'item-' + i, ref: index },
            _react2.default.createElement(
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

        return _react2.default.Children.map(children, function (item, i) {
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
        className = (0, _className2.default)(className, 'menu _menu-' + level);
        if (popped) {
            className += ' _popped';
        }
        if (horizontal) {
            className += ' _horizontal';
        }
        if (!horizontal && !popped) {
            className += ' _default';
        }

        var menuNode = mode === 'hover' && popped || horizontal ? _react2.default.createElement(
            'div',
            { onMouseLeave: function onMouseLeave() {
                    return _this5.closeSubMenu();
                }, ref: 'base',
                className: 'menu ' + className + ' _hover', style: style },
            this.formatMenu(children, level)
        ) : _react2.default.createElement(
            'div',
            { ref: 'base', className: className, style: style },
            this.formatMenu(children, level)
        );

        return menuNode;
    }
});

exports.default = Menu;