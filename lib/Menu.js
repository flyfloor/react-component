'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var Component = React.Component;
var PropTypes = require('prop-types');
var ReactDOM = require('react-dom');
var domUtil = require('./util/dom');
var removeClass = domUtil.removeClass,
    hasClass = domUtil.hasClass,
    addClass = domUtil.addClass,
    getClassList = domUtil.getClassList;

var documentClickCmp = require('./high-order/documentClickCmp');
var klassName = require('./util/className');

var Menu = function (_Component) {
    _inherits(Menu, _Component);

    function Menu(props) {
        _classCallCheck(this, Menu);

        var _this = _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).call(this, props));

        _this.closeSubMenu = _this.closeSubMenu.bind(_this);
        _this.toggleSubMenu = _this.toggleSubMenu.bind(_this);
        _this.handleItemClick = _this.handleItemClick.bind(_this);

        var current = props.current;

        _this.state = {
            current: current
        };
        return _this;
    }

    _createClass(Menu, [{
        key: 'closeSubMenu',
        value: function closeSubMenu(node) {
            var _props = this.props,
                popped = _props.popped,
                mode = _props.mode,
                horizontal = _props.horizontal;

            if (popped || mode === 'hover' || horizontal) {
                var base = node || ReactDOM.findDOMNode(this.refs.base);
                removeClass(base.querySelectorAll('.sub-menu._active'), '_active');
            }
        }
    }, {
        key: 'toggleSubMenu',
        value: function toggleSubMenu(index) {
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
        }
    }, {
        key: 'handleItemClick',
        value: function handleItemClick(index, disabled) {
            var _this2 = this;

            if (disabled) return;
            var onChange = this.props.onChange;

            if (onChange) onChange(index);
            this.setState({
                current: index
            }, function () {
                return _this2.closeSubMenu();
            });
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.current !== this.props.current) {
                this.setState({
                    current: nextProps.current
                });
            }
        }

        // other place click, close submenu

    }, {
        key: 'onOtherDomClick',
        value: function onOtherDomClick() {
            this.closeSubMenu();
        }
    }, {
        key: 'formatChild',
        value: function formatChild(node, i, _ref) {
            var _this3 = this;

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
                        return _this3.handleItemClick(index, disabled);
                    } },
                children
            );
        }

        // generate submenu

    }, {
        key: 'formatSubMenu',
        value: function formatSubMenu(node, i, _ref2) {
            var _this4 = this;

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
                                return _this4.toggleSubMenu(index);
                            },
                            onClick: function onClick() {
                                return _this4.toggleSubMenu(index);
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
                            return _this4.toggleSubMenu(index);
                        } },
                    title
                ),
                childNodes
            );
        }
    }, {
        key: 'formatMenu',
        value: function formatMenu(children, level) {
            var _this5 = this;

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
                return sub ? _this5.formatSubMenu(item, i, { accordion: accordion, popped: popped, mode: mode, current: current, horizontal: horizontal, level: level }) : _this5.formatChild(item, i, { current: current });
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this6 = this;

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
                        return _this6.closeSubMenu();
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
    }]);

    return Menu;
}(Component);

Menu.propTypes = {
    onChange: PropTypes.func,
    accordion: PropTypes.bool,
    popped: PropTypes.bool,
    horizontal: PropTypes.bool,
    mode: PropTypes.oneOf(['click', 'hover'])
};

Menu.defaultProps = {
    accordion: false,
    popped: false,
    horizontal: false,
    mode: 'click',
    className: ''
};

module.exports = documentClickCmp(Menu);