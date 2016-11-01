'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _className = require('./util/className');

var _className2 = _interopRequireDefault(_className);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SlideMenu = _react2.default.createClass({
    displayName: 'SlideMenu',

    propTypes: {
        position: _react2.default.PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
        width: _react2.default.PropTypes.number,
        onClose: _react2.default.PropTypes.func
    },

    getInitialState: function getInitialState() {
        return {
            display: false
        };
    },
    getDefaultProps: function getDefaultProps() {
        return {
            width: 300,
            position: 'right'
        };
    },
    calcPositionStyle: function calcPositionStyle() {
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
    },
    open: function open() {
        this.setState({
            display: true
        });
    },
    close: function close() {
        var onClose = this.props.onClose;

        if (onClose && !onClose()) return;
        this.setState({
            display: false
        });
    },
    render: function render() {
        var display = this.state.display;
        var _props2 = this.props,
            className = _props2.className,
            children = _props2.children;

        className = (0, _className2.default)(className, 'slide-menu');

        return _react2.default.createElement(
            'div',
            { className: className + ' ' + (display ? '_display' : '') },
            _react2.default.createElement(
                'div',
                { className: '_content', ref: 'contentDOM', style: this.calcPositionStyle() },
                children
            ),
            _react2.default.createElement('div', { className: '_overlay', onClick: this.close })
        );
    }
});

exports.default = SlideMenu;