'use strict';

var React = require('react');
var klassName = require('./util/className');

var SlideMenu = React.createClass({
    displayName: 'SlideMenu',

    propTypes: {
        position: React.PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
        width: React.PropTypes.number,
        onClose: React.PropTypes.func
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

        className = klassName(className, 'slide-menu');

        return React.createElement(
            'div',
            { className: className + ' ' + (display ? '_display' : '') },
            React.createElement(
                'div',
                { className: '_content', ref: 'contentDOM', style: this.calcPositionStyle() },
                children
            ),
            React.createElement('div', { className: '_overlay', onClick: this.close })
        );
    }
});

module.exports = SlideMenu;