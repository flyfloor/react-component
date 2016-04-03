const React = require('react');

const Modal = React.createClass({
    propTypes: {
        title: React.PropTypes.string,
        confirmText: React.PropTypes.string,
        cancelText: React.PropTypes.string,
        onConfirm: React.PropTypes.func,
        onCancel: React.PropTypes.func,
        onClose: React.PropTypes.func.isRequired,
        display: React.PropTypes.bool,
        closeIcon: React.PropTypes.element,
    },

    getInitialState() {
        return {
            open: this.props.display, 
        };
    },
    
    getDefaultProps() {
        return {
            display: false,
            title: 'modal title',
            confirmText: 'confirm',
            cancelText: 'cancel',
            closeIcon: <span>x</span>,
        };
    },

    componentWillReceiveProps(nextProps) {
        this.setState({
            open: nextProps.display 
        });
    },

    handleConfirm(){
        if (this.props.onConfirm()) this.closeModal();
    },

    handleCancel(){
        if (this.props.onCancel()) this.closeModal();
    },

    closeModal(){
        this.props.onClose();
        this.setState({
            open: false, 
        });
    },

    render() {
        const {onConfirm, onCancel, confirmText, cancelText, title, children, style, force, closeIcon} = this.props;
        const {open} = this.state;
        let actionDOM = [];
        if (onConfirm) actionDOM.push(<a href='javascript:;' key='confirm-action' 
                                        onClick={this.handleConfirm}>{confirmText}</a>);
        if (onCancel) actionDOM.push(<a href='javascript:;' key='cancel-action'
                                        onClick={this.handleCancel}>{cancelText}</a>);

        let footer = onCancel || onConfirm ? 
                <div className='_action'>
                    {actionDOM}
                </div> 
                : null; 

        let className = ['ui', 'modal'];
        if (open) className.push('_show');
        if (force) className.push('_force');
        className = className.join(' ');

        return (
            <div className='' style={style} className={className}>
                <div>
                    <div className="_body">
                        <div className="_wrap">
                            <div className="_title">{title}</div>
                            <div className="_content">
                                {children}
                                {footer}
                            </div>
                            {force ? 
                                null
                                : <div className="_close" onClick={this.closeModal}>{closeIcon}</div>}
                        </div>
                    </div>
                    {force ? 
                        <div className="_overlay"></div>
                        : <div className="_overlay" onClick={this.closeModal}></div>
                    }
                </div> 
            </div>
        );
    }
});

module.exports = Modal;