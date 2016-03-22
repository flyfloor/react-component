const React = require('react');
const DocumentClickMixin = require('./mixin/DocumentClickMixin');
const PopUpMixin = require('./mixin/PopUpMixin');

const ConfirmBox = React.createClass({
    mixins: [DocumentClickMixin, PopUpMixin],

    propTypes: {
        onCancel: React.PropTypes.func,
        onConfirm: React.PropTypes.func,
        force: React.PropTypes.bool,
    },

    closeConfirm(){
        this.setState({
            open: false 
        });
    },

    onOtherDomClick(e){
        if (!this.props.force) this.closeConfirm();
    },

    handleCancel(){
        const {onCancel} = this.props;
        if (!onCancel) return this.closeConfirm();
        if(onCancel()) this.closeConfirm();
    },

    handleConfirm(){
        const {onConfirm} = this.props;
        if (!onConfirm) return this.closeConfirm();
        if (onConfirm()) this.closeConfirm();
    },

    render() {
        const {confirmText, cancelText, position, title, style, children} = this.props;

        let content = this.state.open ? 
            <div className={'_wrap _' + position}>
                <div ref='content' className='_content'>
                    <div className="_title">
                        {title}
                    </div>
                    <div className="_action">
                        <a href="javascript:;" className="_confirm" onClick={this.handleConfirm}>{confirmText ? confirmText : 'ok'}</a>
                        <a href="javascript:;" className="_cancel" onClick={this.handleCancel}>{cancelText ? cancelText : 'cancel'}</a>
                    </div>
                    <span className="_arrow" ref='arrow'></span>
                </div>
            </div> 
            : null;
        return (
            <span className='ui confirm-box popup' style={style} onClick={this.onTrigger}>
                <span className="_trigger" ref='trigger'>
                    {children}
                </span>
                {content}
            </span>
        );
    }
});

module.exports = ConfirmBox;
