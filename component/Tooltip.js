const React = require('react')
const Component = React.Component
const PropTypes = require('prop-types')
const ReactCssTransitionGroup = require('react-addons-css-transition-group')
const documentClickCmp = require('./high-order/documentClickCmp')
const popUpCmp = require('./high-order/popUpCmp')
const klassName = require('./util/className')

class Tooltip extends Component {
    constructor(props) {
        super(props);
    }

    onOtherDomClick(){
        this.popUpClose()
    }
    
    render() {
        const {open} = this.state;
        let {position, content, style, className, children, mode} = this.props;
        className = klassName('popup', className)
        if (open) {
            className = `${className} _active`;
        }

        let onMouseLeave = null, 
            onMouseEnter = null, 
            onClick = null;

        if (mode === 'click') {
            onClick = this.onTrigger
        } else {
            onMouseEnter = e => this.onTrigger(e, true)
            onMouseLeave = e => this.onTrigger(e, false)
        }

        return (
            <span 
                className={className} 
                style={style} 
                onClick={onClick}
                onMouseEnter={onMouseEnter} 
                onMouseLeave={onMouseLeave}
            >
                <span 
                    className="_trigger" 
                    ref={ ref => { this.trigger = ref } }
                >
                    {children}
                </span>
                <ReactCssTransitionGroup className={'_wrap _' + position} transitionName="popup"
                    transitionEnterTimeout={200} transitionLeaveTimeout={200}>
                    {open ? 
                        <div ref={ref => {
                            this.content = ref
                        }} className='_content'>
                            <div className="_title">
                                {content}
                            </div>
                            <span className="_arrow" ref={ref => {
                                this.arrow = ref
                            }}></span>
                        </div>
                        : null
                    }
                </ReactCssTransitionGroup>
            </span>
        );
    }
}

Tooltip.defaultProps = {
    className: '',
    mode: 'hover',
}

Tooltip.propTypes = {
    content: PropTypes.element.isRequired,
    mode: PropTypes.oneOf(['hover', 'click'])
}

module.exports = popUpCmp(documentClickCmp(Tooltip));