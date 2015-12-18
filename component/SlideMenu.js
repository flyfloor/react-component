import React from 'react';
import ReactDOM from 'react-dom';

const SlideMenu = React.createClass({
    propTypes: {
        position: React.PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
    },

    getInitialState() {
        return {
            display: this.props.display 
        };
    },
    getDefaultProps() {
        return {
            display: false,
            position: 'right',
        };
    },

    calcPositionStyle(){
        let position = this.props.position, 
            size = 300,
            cord = this.state.display ? 0 : size;

        switch(position){
            case 'left':
                return {transform: `translate(${-cord}px, 0)`,
                        width: `${size}px`,
                        left: 0,
                        top: 0}
            case 'top':
                return {transform: `translate(0, ${-cord}px)`,
                        height: `${size}px`,
                        left: 0,
                        top: 0}
            case 'bottom':
                return {transform: `translate(0, ${cord}px)`,
                        height: `${size}px`,
                        left: 0,
                        bottom: 0}
            default:
                return {transform: `translate(${cord}px, 0)`,
                        width: `${size}px`,
                        right:0,
                        top:0}
        }
    },
    
    handleCloseSide(){
        this.setState({
            display: false
        });
        this.props.onSlideClose();
    },
    
    componentWillReceiveProps(nextProps) {
        if (this.props.display != nextProps.display) {
            this.setState({
                display: nextProps.display 
            });
        }
    },

    render() {
        let display = this.state.display;

        // let contentCss = {
        //     width: this.state.baseWidth * (this.state.count + 2),
        //     transform: `translate(-${this.state.baseWidth * (this.state.index + 1)}px, 0)`,
        // }

        return (
            <div className={`ui slide-menu ${display ? '_display': ''}`}>
                <div className='_content' ref='contentDOM' style={this.calcPositionStyle()}>
                    {this.props.children}
                </div>
                <div className="_overlay" onClick={this.handleCloseSide}></div>
            </div>
        );
    }
});

export default SlideMenu;