const React = require('react')
const ReactDOM = require('react-dom')
const Component = React.Component
const PropTypes = require('prop-types')
const ReactCssTransitionGroup = require('react-addons-css-transition-group')
const documentClickCmp = require('./high-order/documentClickCmp')
const popUpCmp = require('./high-order/popUpCmp')
const klassName = require('./util/className')

class ConfirmBox extends Component {
    constructor(props) {
        super(props);
        this.handleCancel = this.handleCancel.bind(this)
        this.handleConfirm = this.handleConfirm.bind(this)
        this.handleTrigger = this.handleTrigger.bind(this)
    }

    onOtherDomClick(){
        if (!this.props.force) this.popUpClose();
    }

    handleCancel(){
        const { onCancel } = this.props;
        if (!onCancel) return this.popUpClose();
        if(onCancel()) this.popUpClose();
    }

    handleConfirm(){
        const { onConfirm } = this.props;
        if (!onConfirm) return this.popUpClose();
        if (onConfirm()) this.popUpClose();
    }

    handleTrigger(e) {
        const contentDOM = ReactDOM.findDOMNode(this.content)
        if (e.target && contentDOM && (contentDOM === e.target || contentDOM.contains(e.target))) {
            return
        }
        this.onTrigger(e, true)
    }

    render() {
        let {confirm, cancel, position, className, content, style, children} = this.props;
        const { open } = this.state;
        className = klassName('confirm-box popup', className);
        if (open) {
            className = `${className} _active`;
        }

        return (
            <span 
                className={className} 
                style={style} 
                onClick={this.handleTrigger}
            >
                <span 
                    className="_trigger" 
                    ref={ref => { this.trigger = ref }}
                >
                    {children}
                </span>
                <ReactCssTransitionGroup 
                    className={'_wrap _' + position} 
                    transitionName="popup"
                    transitionEnterTimeout={200} 
                    transitionLeaveTimeout={200}
                >
                    {
                        open ?
                            <div 
                                className='_content' 
                                ref={ ref => { this.content = ref }}
                            >
                                <div className="_title">{content}</div>
                                <div className="_action">
                                    <div 
                                        className="_confirm" 
                                        onClick={this.handleConfirm}
                                    >
                                        { confirm ? confirm : <div>ok</div> }
                                    </div>
                                    <div 
                                        className="_cancel" 
                                        onClick={this.handleCancel}
                                    >
                                        { cancel ? cancel : <div>cancel</div> }
                                    </div>
                                </div>
                                <span 
                                    className="_arrow" 
                                    ref={ref => { this.arrow = ref }}
                                >
                                </span>
                            </div>
                            : null
                    }
                </ReactCssTransitionGroup>
            </span>
        );
    }
}

ConfirmBox.propTypes = {
    onCancel: PropTypes.func,
    onConfirm: PropTypes.func,
    force: PropTypes.bool,
    content: PropTypes.element.isRequired,
    confirm: PropTypes.element,
    cancel: PropTypes.element,
}

ConfirmBox.defaultProps = {
    className: ''
}

module.exports = popUpCmp(documentClickCmp(ConfirmBox))