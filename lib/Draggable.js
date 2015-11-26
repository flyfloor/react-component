'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var Draggable = React.createClass({
    displayName: 'Draggable',
    getInitialState: function getInitialState() {
        return {
            dragging: false,
            originX: 0,
            originY: 0,
            offsetX: 0,
            offsetY: 0
        };
    },
    componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
        if (this.state.dragging) {
            document.addEventListener('mousemove', this.handleDragging);
        } else {
            document.removeEventListener('mousemove', this.handleDragging);
        }
    },
    beginDrag: function beginDrag(e) {
        this.setState({
            dragging: true,
            originX: e.pageX,
            originY: e.pageY
        });
    },
    handleDragging: function handleDragging(e) {
        if (this.state.dragging) {
            var _x = e.pageX - this.state.originX + this.state.offsetX,
                _y = e.pageY - this.state.originY + this.state.offsetY;

            this.calcTranslate(_x, _y);
        };
    },
    calcTranslate: function calcTranslate(x, y) {
        var BASE_NODE = ReactDOM.findDOMNode(this);
        BASE_NODE.setAttribute("style", 'transform:translate(' + x + 'px, ' + y + 'px)');
    },
    stopDrag: function stopDrag(e) {
        if (this.state.dragging) {
            this.setState({
                offsetX: e.pageX - this.state.originX + this.state.offsetX,
                offsetY: e.pageY - this.state.originY + this.state.offsetY
            });
        };
        this.setState({
            dragging: false
        });
    },
    render: function render() {
        return React.createElement(
            'div',
            { className: 'ui draggable', style: this.props.style, onMouseDown: this.beginDrag, onMouseLeave: this.stopDrag, onMouseUp: this.stopDrag },
            this.props.children
        );
    }
});

module.exports = Draggable;