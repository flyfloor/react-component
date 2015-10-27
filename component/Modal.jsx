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

    handleConfirm(e){
        this.props.onConfirm(e);
        this.closeModal(e);
    },

    handleCancel(e){
        this.props.onCancel(e);
        this.closeModal(e);
    },

    closeModal(e){
        this.props.onClose();
        this.setState({
            open: false, 
        });
    },

    render() {
        let confirmDOM = this.props.onConfirm ? <a href='javascript:;' onClick={this.handleConfirm}>{this.props.confirmText}</a> : null;
        let cancelDOM = this.props.onCancel ? <a href='javascript:;' onClick={this.handleCancel}>{this.props.cancelText}</a> : null;
        let footer = confirmDOM || cancelDOM ? 
                    <div className='_action'>
                        <div className="_wrap">
                            {confirmDOM}
                            {cancelDOM}
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