'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var ReactDOM = require('react-dom');
var Component = React.Component;
var PropTypes = require('prop-types');
var domUtil = require('./util/dom');
var klassName = require('./util/className');
var getClassList = domUtil.getClassList,
    toggleClass = domUtil.toggleClass;

var Menu = function (_Component) {
    _inherits(Menu, _Component);

    function Menu(props) {
        _classCallCheck(this, Menu);

        var _this = _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).call(this, props));

        _this.state = {
            current: props.current
        };
        return _this;
    }

    _createClass(Menu, [{
        key: 'getChildContext',
        value: function getChildContext() {
            var current = this.state.current;

            return {
                current: current,
                paddingLeft: this.props.paddingLeft,
                onMenuSelect: this.handleMenuSelect.bind(this)
            };
        }
    }, {
        key: 'handleMenuSelect',
        value: function handleMenuSelect(current) {
            this.setState({
                current: current
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var newProps = Object.assign({}, this.props);
            delete newProps.paddingLeft;
            return React.createElement('ul', _extends({ className: 'menu' }, newProps));
        }
    }]);

    return Menu;
}(Component);

Menu.childContextTypes = {
    current: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onMenuSelect: PropTypes.func,
    paddingLeft: PropTypes.number
};

Menu.propTypes = {
    current: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    paddingLeft: PropTypes.number
};

Menu.defaultProps = {
    paddingLeft: 12
};

var generateMenuItemByChildren = function generateMenuItemByChildren(children, opt) {
    opt = opt || {};
    var type = opt.type || 'group';
    var level = opt.level || 1;

    if (!children) {
        return null;
    }

    if (children instanceof Array) {
        return children.map(function (item, index) {
            if (item.type === MenuItem) {
                return React.createElement(
                    MenuItem,
                    _extends({ key: index
                    }, item.props, { level: level,
                        className: '_' + type + '-item _item' }),
                    item.props.children
                );
            }
            if (item.type === SubMenu) {
                return React.createElement(SubMenu, _extends({
                    key: 'submenu-' + index
                }, item.props, { level: level }));
            }
            if (item.type === MenuGroup) {
                return React.createElement(MenuGroup, _extends({
                    key: 'group-' + index
                }, item.props, { level: level }));
            }
            return item;
        });
    }

    if (children.type === MenuItem) {
        return React.createElement(MenuItem, _extends({}, children.props, { level: level,
            className: '_' + type + '-item _item' }));
    }

    if (children.type === SubMenu) {
        return React.createElement(SubMenu, _extends({}, children.props, { level: level }));
    }

    if (children.type === MenuGroup) {
        return React.createElement(MenuGroup, _extends({}, children.props, { level: level }));
    }
    return children;
};

var SubMenu = function (_Component2) {
    _inherits(SubMenu, _Component2);

    function SubMenu(props) {
        _classCallCheck(this, SubMenu);

        var _this2 = _possibleConstructorReturn(this, (SubMenu.__proto__ || Object.getPrototypeOf(SubMenu)).call(this, props));

        _this2.toggleSubmenu = _this2.toggleSubmenu.bind(_this2);
        return _this2;
    }

    _createClass(SubMenu, [{
        key: 'toggleSubmenu',
        value: function toggleSubmenu() {
            var node = ReactDOM.findDOMNode(this);
            toggleClass(node, '_active');
        }
    }, {
        key: 'render',
        value: function render() {
            var newProps = Object.assign({}, this.props);
            var paddingLeft = this.context.paddingLeft;
            var title = newProps.title,
                level = newProps.level;

            delete newProps.title;
            delete newProps.level;
            return React.createElement(
                'li',
                _extends({ className: '_submenu' }, newProps),
                React.createElement(
                    'div',
                    { className: '_title', style: { 'paddingLeft': paddingLeft * level + 'px' },
                        onClick: this.toggleSubmenu },
                    title
                ),
                React.createElement(
                    'ul',
                    { className: '_content' },
                    generateMenuItemByChildren(newProps.children, { type: 'submenu', level: level + 1 })
                )
            );
        }
    }]);

    return SubMenu;
}(Component);

SubMenu.propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]).isRequired
};

SubMenu.contextTypes = {
    paddingLeft: PropTypes.number
};

SubMenu.defaultProps = {
    level: 1
};

var MenuGroup = function MenuGroup(props, context) {
    var newProps = Object.assign({}, props);
    var title = newProps.title,
        level = newProps.level;

    delete newProps.title;
    delete newProps.level;
    return React.createElement(
        'li',
        _extends({ className: '_group' }, newProps),
        React.createElement(
            'div',
            { className: '_title', style: { 'paddingLeft': context.paddingLeft * level + 'px' } },
            title
        ),
        React.createElement(
            'ul',
            { className: '_content' },
            generateMenuItemByChildren(newProps.children, { level: level + 1 })
        )
    );
};

MenuGroup.propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]).isRequired
};

MenuGroup.contextTypes = {
    paddingLeft: PropTypes.number
};

MenuGroup.defaultProps = {
    level: 1
};

var MenuItem = function MenuItem(props, context) {
    var newProps = Object.assign({}, props);
    var index = newProps.index,
        className = newProps.className,
        disabled = newProps.disabled,
        level = newProps.level;

    delete newProps.index;
    delete newProps.level;
    if (!index) {
        throw Error('index is needed on MenuItem');
    }
    var current = context.current,
        onMenuSelect = context.onMenuSelect,
        paddingLeft = context.paddingLeft;

    var active = index === current;
    className = klassName(className, active ? '_active _item' : '_item', disabled ? '_disabled' : '');

    return React.createElement('li', _extends({}, newProps, { className: className,
        style: { 'paddingLeft': paddingLeft * level + 'px' },
        onClick: function onClick() {
            if (disabled) {
                return;
            }
            onMenuSelect(index);
            if (props.onClick) {
                props.onClick(index);
            }
        } }));
};

MenuItem.propTypes = {
    onClick: PropTypes.func,
    level: PropTypes.number
};

MenuItem.contextTypes = {
    current: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    paddingLeft: PropTypes.number,
    onMenuSelect: PropTypes.func
};

MenuItem.defaultProps = {
    level: 1
};

module.exports = {
    Menu: Menu, MenuGroup: MenuGroup, MenuItem: MenuItem, SubMenu: SubMenu
};