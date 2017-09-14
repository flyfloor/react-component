'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var Component = React.Component;
var PropTypes = require('prop-types');
var klassName = require('./util/className');

var SlideMenu = function (_Component) {
    _inherits(SlideMenu, _Component);

    function SlideMenu(props) {
        _classCallCheck(this, SlideMenu);

        var _this = _possibleConstructorReturn(this, (SlideMenu.__proto__ || Object.getPrototypeOf(SlideMenu)).call(this, props));

        _this.open = _this.open.bind(_this);
        _this.close = _this.close.bind(_this);

        _this.state = {
            display: false
        };
        return _this;
    }

    _createClass(SlideMenu, [{
        key: 'calcPositionStyle',
        value: function calcPositionStyle() {
            var _props = this.props,
                position = _props.position,
                width = _props.width;
            var display = this.state.display;

            var cord = display ? 0 : width;

            switch (position) {
                case 'left':
                    return { transform: 'translate3d(' + -cord + 'px, 0, 0)',
                        width: width + 'px',
                        left: 0,
                        top: 0 };
                case 'top':
                    return { transform: 'translate3d(0, ' + -cord + 'px, 0)',
                        height: width + 'px',
                        left: 0,
                        top: 0 };
                case 'bottom':
                    return { transform: 'translate3d(0, ' + cord + 'px, 0)',
                        height: width + 'px',
                        left: 0,
                        bottom: 0 };
                default:
                    return { transform: 'translate3d(' + cord + 'px, 0, 0)',
                        width: width + 'px',
                        right: 0,
                        top: 0 };
            }
        }
    }, {
        key: 'open',
        value: function open() {
            this.setState({
                display: true
            });
        }
    }, {
        key: 'close',
        value: function close() {
            var onClose = this.props.onClose;

            if (onClose && !onClose()) return;
            this.setState({
                display: false
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var display = this.state.display;
            var _props2 = this.props,
                className = _props2.className,
                children = _props2.children;

            className = klassName(className, 'slide-menu');

            return React.createElement(
                'div',
                { className: className + ' ' + (display ? '_display' : '') },
                React.createElement(
                    'div',
                    { className: '_content', style: this.calcPositionStyle() },
                    children
                ),
                React.createElement('div', { className: '_overlay', onClick: this.close })
            );
        }
    }]);

    return SlideMenu;
}(Component);

SlideMenu.propTypes = {
    position: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
    width: PropTypes.number,
    onClose: PropTypes.func
};

SlideMenu.defaultProps = {
    width: 300,
    position: 'right'
};

module.exports = SlideMenu;