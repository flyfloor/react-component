'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SlideMenu = _react2.default.createClass({
    displayName: 'SlideMenu',

    propTypes: {
        position: _react2.default.PropTypes.oneOf(['left', 'right', 'top', 'bottom'])
    },

    getInitialState: function getInitialState() {
        return {
            display: this.props.display
        };
    },
    getDefaultProps: function getDefaultProps() {
        return {
            display: false,
            position: 'right'
        };
    },
    calcPositionStyle: function calcPositionStyle() {
        var position = this.props.position,
            size = 300,
            cord = this.state.display ? 0 : size;

        switch (position) {
            case 'left':
                return { transform: 'translate(' + -cord + 'px, 0)',
                    width: size + 'px',
                    left: 0,
                    top: 0 };
            case 'top':
                return { transform: 'translate(0, ' + -cord + 'px)',
                    height: size + 'px',
                    left: 0,
                    top: 0 };
            case 'bottom':
                return { transform: 'translate(0, ' + cord + 'px)',
                    height: size + 'px',
                    left: 0,
                    bottom: 0 };
            default:
                return { transform: 'translate(' + cord + 'px, 0)',
                    width: size + 'px',
                    right: 0,
                    top: 0 };
        }
    },
    handleCloseSide: function handleCloseSide() {
        this.setState({
            display: false
        });
        this.props.onSlideClose();
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        if (this.props.display != nextProps.display) {
            this.setState({
                display: nextProps.display
            });
        }
    },
    render: function render() {
        var display = this.state.display;

        // let contentCss = {
        //     width: this.state.baseWidth * (this.state.count + 2),
        //     transform: `translate(-${this.state.baseWidth * (this.state.index + 1)}px, 0)`,
        // }

        return _react2.default.createElement(
            'div',
            { className: 'ui slide-menu ' + (display ? '_display' : '') },
            _react2.default.createElement(
                'div',
                { className: '_content', ref: 'contentDOM', style: this.calcPositionStyle() },
                this.props.children
            ),
            _react2.default.createElement('div', { className: '_overlay', onClick: this.handleCloseSide })
        );
    }
});

exports.default = SlideMenu;