'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var Component = React.Component;
var PropTypes = require('prop-types');

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
            return React.createElement('div', _extends({ className: 'menu' }, this.props));
        }
    }]);

    return Menu;
}(Component);

Menu.childContextTypes = {
    current: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onMenuSelect: PropTypes.func
};

Menu.propTypes = {
    current: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

var SubMenu = function (_Component2) {
    _inherits(SubMenu, _Component2);

    function SubMenu() {
        _classCallCheck(this, SubMenu);

        return _possibleConstructorReturn(this, (SubMenu.__proto__ || Object.getPrototypeOf(SubMenu)).apply(this, arguments));
    }

    _createClass(SubMenu, [{
        key: 'render',
        value: function render() {
            return React.createElement('div', this.props);
        }
    }]);

    return SubMenu;
}(Component);

var MenuGroup = function MenuGroup(props) {
    return React.createElement('div', _extends({ className: '_group' }, props));
};

MenuGroup.propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]).isRequired
};

var MenuItem = function MenuItem(props, context) {
    var newProps = Object.assign({}, props);
    var index = newProps.index;

    delete newProps.index;
    if (!index) {
        throw Error('index is needed on MenuItem');
    }
    var current = context.current,
        onMenuSelect = context.onMenuSelect;

    var active = index === current;
    var className = active ? '_active _item' : '_item';
    return React.createElement('div', _extends({ className: className }, newProps, {
        onClick: function onClick() {
            if (newProps.disabled) {
                return;
            }
            onMenuSelect(index);
            if (props.onClick) {
                props.onClick(index);
            }
        } }));
};

MenuItem.propTypes = {
    onClick: PropTypes.func
};

MenuItem.contextTypes = {
    current: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onMenuSelect: PropTypes.func
};

module.exports = {
    Menu: Menu, MenuGroup: MenuGroup, MenuItem: MenuItem, SubMenu: SubMenu
};