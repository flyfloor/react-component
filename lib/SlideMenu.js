'use strict';

var React = require('react');

var SlideMenu = React.createClass({
    displayName: 'SlideMenu',

    propTypes: {
        position: React.PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
        width: React.PropTypes.number,
        onClose: React.PropTypes.func.isRequired
    },

    getInitialState: function getInitialState() {
        var display = this.props.display;

        return { display: display };
    },
    getDefaultProps: function getDefaultProps() {
        return {
            width: 300,
            display: false,
            position: 'right'
        };
    },
    calcPositionStyle: function calcPositionStyle() {
        var _props = this.props;
        var position = _props.position;
        var width = _props.width;
        var display = this.state.display;

        var cord = display ? 0 : width;

        switch (position) {
            case 'left':
                return { transform: 'translate(' + -cord + 'px, 0)',
                    width: width + 'px',
                    left: 0,
                    top: 0 };
            case 'top':
                return { transform: 'translate(0, ' + -cord + 'px)',
                    height: width + 'px',
                    left: 0,
                    top: 0 };
            case 'bottom':
                return { transform: 'translate(0, ' + cord + 'px)',
                    height: width + 'px',
                    left: 0,
                    bottom: 0 };
            default:
                return { transform: 'translate(' + cord + 'px, 0)',
                    width: width + 'px',
                    right: 0,
                    top: 0 };
        }
    },
    handleCloseSide: function handleCloseSide() {
        this.setState({
            display: false
        });
        this.props.onClose();
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
        var children = this.props.children;


        return React.createElement(
            'div',
            { className: 'ui slide-menu ' + (display ? '_display' : '') },
            React.createElement(
                'div',
                { className: '_content', ref: 'contentDOM', style: this.calcPositionStyle() },
                children
            ),
            React.createElement('div', { className: '_overlay', onClick: this.handleCloseSide })
        );
    }
});

module.exports = SlideMenu;