'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var ReactDOM = require('react-dom');
var PropTypes = require('prop-types');

var Component = React.Component;
var documentClickCmp = require('./high-order/documentClickCmp');
var domUtil = require('./util/dom');
var klassName = require('./util/className');
var hasClass = domUtil.hasClass,
    removeClass = domUtil.removeClass,
    addClass = domUtil.addClass;

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
            var mode = this.props.mode;

            return {
                current: current,
                mode: mode,
                paddingLeft: this.props.paddingLeft,
                onMenuSelect: this.handleMenuSelect.bind(this),
                mutexSubmenu: this.clearSubmenuOpenStatus.bind(this)
            };
        }

        // submenu open status

    }, {
        key: 'clearSubmenuOpenStatus',
        value: function clearSubmenuOpenStatus(ref) {
            var baseNode = ref ? ReactDOM.findDOMNode(ref).parentNode : ReactDOM.findDOMNode(this);
            var submenus = baseNode.querySelectorAll('._submenu');
            removeClass(submenus, '_open');
        }

        // submenu active status

    }, {
        key: 'triggerSubmenuActiveStatus',
        value: function triggerSubmenuActiveStatus(selectNode) {
            var submenus = ReactDOM.findDOMNode(this).querySelectorAll('._submenu');
            selectNode = ReactDOM.findDOMNode(selectNode);
            submenus.forEach(function (dom) {
                removeClass(dom, '_active');
                if (dom.contains(selectNode)) {
                    addClass(dom, '_active');
                }
            });
        }
    }, {
        key: 'handleMenuSelect',
        value: function handleMenuSelect(current, selectNode) {
            this.setState({
                current: current
            });

            var _props = this.props,
                onChange = _props.onChange,
                mode = _props.mode;

            if (['horizontal', 'popup'].indexOf(mode) !== -1) {
                this.triggerSubmenuActiveStatus(selectNode);
                var that = this;
                setTimeout(function () {
                    that.clearSubmenuOpenStatus();
                }, 200);
            }
            if (onChange) {
                onChange(current);
            }
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
    }, {
        key: 'render',
        value: function render() {
            var newProps = Object.assign({}, this.props);
            var _props2 = this.props,
                className = _props2.className,
                mode = _props2.mode;

            className = klassName('menu', mode || '_default', className);
            delete newProps.paddingLeft;
            delete newProps.current;
            return React.createElement('ul', _extends({}, newProps, { className: className }));
        }
    }]);

    return Menu;
}(Component);

Menu.childContextTypes = {
    current: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    mode: PropTypes.oneOf(['', 'accordion', 'horizontal', 'popup']),
    onMenuSelect: PropTypes.func,
    mutexSubmenu: PropTypes.func,
    paddingLeft: PropTypes.number
};

Menu.propTypes = {
    current: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    paddingLeft: PropTypes.number,
    mode: PropTypes.oneOf(['', 'accordion', 'horizontal', 'popup'])
};

Menu.defaultProps = {
    paddingLeft: 16,
    mode: ''
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
                        className: '_' + type + '-item' }),
                    item.props.children
                );
            }
            if (item.type === SubMenu) {
                return React.createElement(SubMenu, _extends({
                    key: 'submenu-' + index
                }, item.props, { level: level }));
            }
            if (level !== 1 && item.type === MenuGroup) {
                return React.createElement(MenuGroup, _extends({
                    key: 'group-' + index
                }, item.props, { level: level }));
            }
            return null;
        });
    }

    if (children.type === MenuItem) {
        return React.createElement(MenuItem, _extends({}, children.props, { level: level,
            className: '_' + type + '-item' }));
    }

    if (children.type === SubMenu) {
        return React.createElement(SubMenu, _extends({}, children.props, { level: level }));
    }

    if (level !== 1 && children.type === MenuGroup) {
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
        value: function toggleSubmenu(status) {
            var node = ReactDOM.findDOMNode(this);
            var mode = this.context.mode;

            var _open = status !== undefined ? !status : hasClass(node, '_open');

            if (['accordion', 'horizontal'].indexOf(mode) !== -1) {
                this.context.mutexSubmenu(this);
            }
            _open ? removeClass(node, '_open') : addClass(node, '_open');
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var newProps = Object.assign({}, this.props);
            var title = newProps.title,
                level = newProps.level,
                active = newProps.active,
                className = newProps.className;
            var _context = this.context,
                paddingLeft = _context.paddingLeft,
                mode = _context.mode;

            className = klassName('_submenu', className, active ? '_open' : '');

            if (['popup', 'horizontal'].indexOf(mode) !== -1) {
                newProps.onMouseEnter = function (e) {
                    e.preventDefault();
                    _this3.toggleSubmenu(true);
                };
                newProps.onMouseLeave = function (e) {
                    e.preventDefault();
                    _this3.toggleSubmenu(false);
                };
            }

            delete newProps.title;
            delete newProps.level;
            delete newProps.active;

            return React.createElement(
                'li',
                _extends({}, newProps, { className: className }),
                React.createElement(
                    'div',
                    { className: '_title', style: { 'paddingLeft': paddingLeft * level + 'px' },
                        onClick: function onClick() {
                            return _this3.toggleSubmenu();
                        } },
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
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]).isRequired,
    active: PropTypes.bool
};

SubMenu.contextTypes = {
    paddingLeft: PropTypes.number,
    mutexSubmenu: PropTypes.func,
    mode: PropTypes.oneOf(['', 'accordion', 'popup', 'horizontal'])
};

SubMenu.defaultProps = {
    level: 1,
    active: false
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

var MenuItem = function (_Component3) {
    _inherits(MenuItem, _Component3);

    function MenuItem() {
        _classCallCheck(this, MenuItem);

        return _possibleConstructorReturn(this, (MenuItem.__proto__ || Object.getPrototypeOf(MenuItem)).apply(this, arguments));
    }

    _createClass(MenuItem, [{
        key: 'render',
        value: function render() {
            var _this5 = this;

            var newProps = Object.assign({}, this.props);
            var index = newProps.index,
                className = newProps.className,
                disabled = newProps.disabled,
                level = newProps.level;

            delete newProps.index;
            delete newProps.level;
            if (!index) {
                throw Error('index is needed on MenuItem');
            }
            var _context2 = this.context,
                current = _context2.current,
                onMenuSelect = _context2.onMenuSelect,
                paddingLeft = _context2.paddingLeft;

            var active = index === current;
            className = klassName(className, active ? '_active _item' : '_item', disabled ? '_disabled' : '');

            return React.createElement('li', _extends({}, newProps, { className: className,
                style: { 'paddingLeft': paddingLeft * level + 'px' },
                onClick: function onClick() {
                    if (disabled) {
                        return;
                    }
                    onMenuSelect(index, _this5);
                    if (newProps.onClick) {
                        newProps.onClick(index);
                    }
                } }));
        }
    }]);

    return MenuItem;
}(Component);

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
    Menu: documentClickCmp(Menu),
    MenuGroup: MenuGroup,
    MenuItem: MenuItem,
    SubMenu: SubMenu
};