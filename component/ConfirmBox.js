const React = require('react');
const DocumentClickMixin = require('./mixin/DocumentClickMixin');
const PopUpMixin = require('./mixin/PopUpMixin');

const ConfirmBox = React.createClass({
    mixins: [DocumentClickMixin, PopUpMixin],

    propTypes: {
        onCancel: React.PropTypes.func,
        onConfirm: React.PropTypes.func,
    },

    closeConfirm(){
        this.setState({
            open: false 
        });
    },

    onOtherDomClick(e){
        this.closeConfirm();
    },

    handleCancel(){
        if (!this.props.onCancel) return this.closeConfirm();
        if(this.props.onCancel()) this.closeConfirm();
    },

    handleConfirm(){
        if (!this.props.onConfirm) return this.closeConfirm();
        if (this.props.onConfirm()) this.closeConfirm();
    },

    render() {
        let confirmText = this.props.confirmText;
        let cancelText = this.props.cancelText;
        let content = this.state.open ? <div className={'_wrap _' + this.props.position}>
                                            <div ref='content' className='_content'>
                                                <div className="_title">
                                                    {this.props.title}
                                                </div>
                                                <div className="_action">
                                                    <a href="javascript:;" className="_confirm" onClick={this.handleConfirm}>{confirmText ? confirmText : 'ok'}</a>
                                                    <a href="javascript:;" className="_cancel" onClick={this.handleCancel}>{cancelText ? cancelText : 'cancel'}</a>
                                                </div>
                                                <span className="_arrow" ref='arrow'></span>
                                            </div>
                                        </div> : null;
        return (
            <span className='ui confirm-box popup' style={this.props.style} onClick={this.onTrigger}>
                <span className="_trigger" ref='trigger'>
                    {this.props.children}
                </span>
                {content}
            </span>
        );
    }
});

module.exports = ConfirmBox;
