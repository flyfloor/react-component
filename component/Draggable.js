const React = require('react');
const ReactDOM = require('react-dom');

const Draggable = React.createClass({
    getInitialState() {
        return {
            dragging: false,
            originX: 0,
            originY: 0,
        };
    },

    beginDrag(e){
        let target = e.target;
        this.setState({
            dragging: true,
            originX: target.offsetLeft,
            originY: target.offsetTop + target.offsetHeight,
        });
    },


    calcTranslate(x,y){
        let BASE_NODE = ReactDOM.findDOMNode(this);
        BASE_NODE.setAttribute("style", `transform:translate(${this.state.originX}px, ${this.state.originY}px)`);
    },

    stopDrag(e){
        if (this.state.dragging) {
            console.log(e.pageX)
            this.setState({
                originX: e.pageX - this.state.originX,
                originY: e.pageY - this.state.originY,
            }, () => this.calcTranslate());
        };
        this.setState({
            dragging: false,
        });
    },

    render() {
        return (
            <div className={`ui draggable ${this.state.dragging ? 'dragging': ''}`} style={this.props.style} draggable="true" onDragStart={this.beginDrag} onDragEnd={this.stopDrag}>
                {this.props.children}
            </div>
        );
    }
});


module.exports = Draggable;