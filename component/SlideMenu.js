const React = require('react')
const Component = React.Component
const PropTypes = require('prop-types')
const klassName = require('./util/className')

class SlideMenu extends Component {
    constructor(props) {
        super(props);
        this.open = this.open.bind(this)
        this.close = this.close.bind(this)

        this.state = {
            display: false,
        }
    }
    
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
    }

    open(){
        this.setState({
            display: true
        });
    }

    close(){
        const {onClose} = this.props
        if (onClose && !onClose()) return
        this.setState({
            display: false
        });
    }

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
}

SlideMenu.propTypes = {
    position: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
    width: PropTypes.number,
    onClose: PropTypes.func,
}

SlideMenu.defaultProps = {
    width: 300,
    position: 'right',
}

module.exports = SlideMenu;