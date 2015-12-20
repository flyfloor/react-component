'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var Draggable = React.createClass({
    displayName: 'Draggable',
    getInitialState: function getInitialState() {
        return {
            dragging: false,
            originX: 0,
            originY: 0
        };
    },
    beginDrag: function beginDrag(e) {
        var target = e.target;
        this.setState({
            dragging: true,
            originX: target.offsetLeft,
            originY: target.offsetTop + target.offsetHeight
        });
    },
    calcTranslate: function calcTranslate(x, y) {
        var BASE_NODE = ReactDOM.findDOMNode(this);
        BASE_NODE.setAttribute("style", 'transform:translate(' + this.state.originX + 'px, ' + this.state.originY + 'px)');
    },
    stopDrag: function stopDrag(e) {
        var _this = this;

        if (this.state.dragging) {
            console.log(e.pageX);
            this.setState({
                originX: e.pageX - this.state.originX,
                originY: e.pageY - this.state.originY
            }, function () {
                return _this.calcTranslate();
            });
        };
        this.setState({
            dragging: false
        });
    },
    render: function render() {
        return React.createElement(
            'div',
            { className: 'ui draggable ' + (this.state.dragging ? 'dragging' : ''), style: this.props.style, draggable: 'true', onDragStart: this.beginDrag, onDragEnd: this.stopDrag },
            this.props.children
        );
    }
});

module.exports = Draggable;