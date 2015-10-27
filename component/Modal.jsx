import css from '../css/modal.less';

const Modal = React.createClass({
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
        };
    },

    componentWillReceiveProps(nextProps) {
        this.setState({
            open: nextProps.display 
        });
    },

    handleConfirm(){
        // this.props.onConfirm();
        // this.closeModal();
        if (this.props.onConfirm()) this.closeModal();
    },

    handleCancel(){
        // this.props.onCancel();
        // this.closeModal();
        if (this.props.onCancel()) this.closeModal();
    },

    closeModal(){
        this.props.onClose();
        this.setState({
            open: false, 
        });
    },

    render() {
        let actionDOM = [],
            hasConfirm = this.props.onConfirm,
            hasCancel = this.props.onCancel;
        if (hasConfirm) actionDOM.push(<a href='javascript:;' key='confirm-action' onClick={this.handleConfirm}>{this.props.confirmText}</a>);
        if (hasCancel) actionDOM.push(<a href='javascript:;' key='cancel-action' onClick={this.handleCancel}>{this.props.cancelText}</a>);

        let footer = hasCancel || hasConfirm ? 
                    <div className='_action'>
                        <div className="_wrap">
                            {actionDOM}
                        </div>
                    </div> : null; 
        
        let base = this.state.open ? <div>
                                        <div className="_body">
                                            <div className="_title">{this.props.title}</div>
                                            <div className="_content">
                                                {this.props.children}
                                                {footer}
                                            </div>
                                            <div className="_close" onClick={this.closeModal}>X</div>
                                        </div>
                                        <div className="_overlay" onClick={this.closeModal}></div>
                                    </div> : null;
        return (
            <div className='ui modal'>
                {base}
            </div>
        );
    }
});

export default Modal;