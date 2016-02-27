const React = require('react');
const ReactDOM = require('react-dom');

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
            width: 300,
            display: false,
            position: 'right',
        };
    },

    calcPositionStyle(){
        let position = this.props.position, 
            width = this.props.width,
            cord = this.state.display ? 0 : width;

        switch(position){
            case 'left':
                return {transform: `translate(${-cord}px, 0)`,
                        width: `${width}px`,
                        left: 0,
                        top: 0}
            case 'top':
                return {transform: `translate(0, ${-cord}px)`,
                        height: `${width}px`,
                        left: 0,
                        top: 0}
            case 'bottom':
                return {transform: `translate(0, ${cord}px)`,
                        height: `${width}px`,
                        left: 0,
                        bottom: 0}
            default:
                return {transform: `translate(${cord}px, 0)`,
                        width: `${width}px`,
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

module.exports = SlideMenu;