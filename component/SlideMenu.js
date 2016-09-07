const React = require('react');
const klassName = require('./util/className');

const SlideMenu = React.createClass({
    propTypes: {
        position: React.PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
        width: React.PropTypes.number,
        onClose: React.PropTypes.func,
    },

    getInitialState() {
        return { 
            display: false 
        }
    },
    getDefaultProps() {
        return {
            width: 300,
            position: 'right',
        };
    },

    calcPositionStyle(){
        const {position, width} = this.props
        const {display} = this.state;
        let cord = display ? 0 : width;

        switch(position){
            case 'left':
                return {transform: `translate3d(${-cord}px, 0, 0)`,
                        width: `${width}px`,
                        left: 0,
                        top: 0}
            case 'top':
                return {transform: `translate3d(0, ${-cord}px, 0)`,
                        height: `${width}px`,
                        left: 0,
                        top: 0}
            case 'bottom':
                return {transform: `translate3d(0, ${cord}px, 0)`,
                        height: `${width}px`,
                        left: 0,
                        bottom: 0}
            default:
                return {transform: `translate3d(${cord}px, 0, 0)`,
                        width: `${width}px`,
                        right:0,
                        top:0}
        }
    },

    open(){
        this.setState({
            display: true
        });
    },

    close(){
        const {onClose} = this.props
        if (onClose && !onClose()) return
        this.setState({
            display: false
        });
    },
    
    render() {
        const {display} = this.state;
        let {className, children} = this.props;
        className = klassName(className, 'slide-menu');

        return (
            <div className={`${className} ${display ? '_display': ''}`}>
                <div className='_content' ref='contentDOM' style={this.calcPositionStyle()}>
                    {children}
                </div>
                <div className="_overlay" onClick={this.close}></div>
            </div>
        );
    }
});

module.exports = SlideMenu;