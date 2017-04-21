const React = require('react')
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
    }

    onOtherDomClick(){
        if (!this.props.force) this.popUpClose();
    }

    handleCancel(){
        const {onCancel} = this.props;
        if (!onCancel) return this.popUpClose();
        if(onCancel()) this.popUpClose();
    }

    handleConfirm(){
        const {onConfirm} = this.props;
        if (!onConfirm) return this.popUpClose();
        if (onConfirm()) this.popUpClose();
    }

    render() {
        let {confirm, cancel, position, className, content, style, children} = this.props;
        const {open} = this.state;
        className = klassName('confirm-box popup', className);
        if (open) {
            className = `${className} _active`;
        }

        return (
            <span className={className} style={style} onClick={this.onTrigger}>
                <span className="_trigger" ref='trigger'>
                    {children}
                </span>
                <ReactCssTransitionGroup className={'_wrap _' + position} transitionName="popup"
                    transitionEnterTimeout={200} transitionLeaveTimeout={200}>
                    {open ?
                        <div ref='content' className='_content'>
                            <div className="_title">{content}</div>
                            <div className="_action">
                                <div className="_confirm" onClick={this.handleConfirm}>
                                    {confirm ?
                                        confirm
                                        : <div>ok</div>}
                                </div>
                                <div className="_cancel" onClick={this.handleCancel}>
                                    {cancel ?
                                        cancel
                                        : <div>cancel</div>}
                                </div>
                            </div>
                            <span className="_arrow" ref='arrow'></span>
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