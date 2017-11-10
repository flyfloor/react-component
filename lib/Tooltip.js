'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var Component = React.Component;
var PropTypes = require('prop-types');
var ReactCssTransitionGroup = require('react-addons-css-transition-group');
var documentClickCmp = require('./high-order/documentClickCmp');
var popUpCmp = require('./high-order/popUpCmp');
var klassName = require('./util/className');

var Tooltip = function (_Component) {
    _inherits(Tooltip, _Component);

    function Tooltip(props) {
        _classCallCheck(this, Tooltip);

        return _possibleConstructorReturn(this, (Tooltip.__proto__ || Object.getPrototypeOf(Tooltip)).call(this, props));
    }

    _createClass(Tooltip, [{
        key: 'onOtherDomClick',
        value: function onOtherDomClick() {
            this.popUpClose();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var open = this.state.open;
            var _props = this.props,
                position = _props.position,
                content = _props.content,
                style = _props.style,
                className = _props.className,
                children = _props.children,
                mode = _props.mode;

            className = klassName('popup', className);
            if (open) {
                className = className + ' _active';
            }

            var onMouseLeave = null,
                onMouseEnter = null,
                onClick = null;

            if (mode === 'click') {
                onClick = this.onTrigger;
            } else {
                onMouseEnter = function onMouseEnter(e) {
                    return _this2.onTrigger(e, true);
                };
                onMouseLeave = function onMouseLeave(e) {
                    return _this2.onTrigger(e, false);
                };
            }

            return React.createElement(
                'span',
                {
                    className: className,
                    style: style,
                    onClick: onClick,
                    onMouseEnter: onMouseEnter,
                    onMouseLeave: onMouseLeave
                },
                React.createElement(
                    'span',
                    {
                        className: '_trigger',
                        ref: function ref(_ref) {
                            _this2.trigger = _ref;
                        }
                    },
                    children
                ),
                React.createElement(
                    ReactCssTransitionGroup,
                    { className: '_wrap _' + position, transitionName: 'popup',
                        transitionEnterTimeout: 200, transitionLeaveTimeout: 200 },
                    open ? React.createElement(
                        'div',
                        { ref: function ref(_ref3) {
                                _this2.content = _ref3;
                            }, className: '_content' },
                        React.createElement(
                            'div',
                            { className: '_title' },
                            content
                        ),
                        React.createElement('span', { className: '_arrow', ref: function ref(_ref2) {
                                _this2.arrow = _ref2;
                            } })
                    ) : null
                )
            );
        }
    }]);

    return Tooltip;
}(Component);

Tooltip.defaultProps = {
    className: '',
    mode: 'hover'
};

Tooltip.propTypes = {
    content: PropTypes.element.isRequired,
    mode: PropTypes.oneOf(['hover', 'click'])
};

module.exports = popUpCmp(documentClickCmp(Tooltip));