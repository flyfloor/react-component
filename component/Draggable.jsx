import React from 'react';
import ReactDOM from 'react-dom';
import css from '../css/draggable.less';

const Draggable = React.createClass({
    getInitialState() {
        return {
            dragging: false,
            originX: 0,
            originY: 0,
            offsetX: 0,
            offsetY: 0
        };
    },

    componentDidUpdate(prevProps, prevState) {
        if (this.state.dragging) {
            document.addEventListener('mousemove', this.handleDragging);
        } else {
            document.removeEventListener('mousemove', this.handleDragging);
        }
    },

    beginDrag(e){
        this.setState({
            dragging: true,
            originX: e.pageX,
            originY: e.pageY
        });
    },

    handleDragging(e){
        if (this.state.dragging) {
            let _x = e.pageX - this.state.originX + this.state.offsetX,
                _y = e.pageY - this.state.originY + this.state.offsetY;

            this.calcTranslate(_x, _y);
        };
    },

    calcTranslate(x,y){
        let BASE_NODE = ReactDOM.findDOMNode(this);
        BASE_NODE.setAttribute("style", `transform:translate(${x}px, ${y}px)`);
    },

    stopDrag(e){
        if (this.state.dragging) {
            this.setState({
                offsetX: e.pageX - this.state.originX + this.state.offsetX,
                offsetY: e.pageY - this.state.originY + this.state.offsetY,
            });
        };
        this.setState({
            dragging: false,
        });
    },

    render() {
        return (
            <div className='ui draggable' onMouseDown={this.beginDrag} onMouseLeave={this.stopDrag} onMouseUp={this.stopDrag}>
                {this.props.children}
            </div>
        );
    }
});

export default Draggable;