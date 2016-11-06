const React = require('react')
const klassName = require('./util/className')

const PropTypes = React.PropTypes;
const Modal = React.createClass({
    propTypes: {
        title: PropTypes.element,
        confirm: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
        cancel: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
        onConfirm: PropTypes.func,
        onCancel: PropTypes.func,
        onClose: PropTypes.func,
        close: PropTypes.element,
    },

    getInitialState() {
        return {
            display: false, 
        };
    },
    
    getDefaultProps() {
        return {
            confirm: 'confirm',
            cancel: 'cancel',
            close: <span>x</span>,
        };
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

    handleConfirm(){
        if (this.props.onConfirm()) this.close();
    },

    handleCancel(){
        if (this.props.onCancel()) this.close();
    },

    render() {
        let {onConfirm, onCancel, confirm, 
            className, cancel, title, children,
             style, force, close} = this.props;

        const {display} = this.state;
        let actionDOM = [];
        if (onConfirm) actionDOM.push(<div key='_confirm-action' className='_action-btn'
                                        onClick={this.handleConfirm}>
                                        {confirm}
                                    </div>);
        if (onCancel) actionDOM.push(<div key='_cancel-action' className='_action-btn'
                                        onClick={this.handleCancel}>
                                        {cancel}
                                    </div>);

        let footer = onCancel || onConfirm 
                ? <div className='_actions'>
                    {actionDOM}
                </div> 
                : null; 

        className = klassName('modal', className);

        if (display) {
            className += ' _show';
        }
        if (force) {
            className += ' _force';
        }

        return (
            <div style={style} className={className}>
                <div className="_body">
                    <div className="_wrap">
                        {title ? 
                            <div className="_title">{title}</div>
                            : null}
                        <div className="_content">
                            {children}
                            {footer}
                        </div>
                        {force 
                            ? null
                            : <div className="_close" onClick={this.close}>{close}</div>}
                    </div>
                </div>
                {force 
                    ? <div className="_overlay"></div>
                    : <div className="_overlay" onClick={this.close}></div>
                }
            </div>
        );
    }
});

module.exports = Modal